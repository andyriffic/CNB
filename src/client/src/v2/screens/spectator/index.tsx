import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import {
  useMatchupProvider,
  Matchup,
  Team,
} from '../../providers/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useTimedGameState } from './hooks/useTimedGameState';
import { Player } from '../../../uplift/contexts/PlayersProvider';
import { getPlayerSnakesAndLaddersMoves } from '../../../uplift/utils/player';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import {
  mockMatchup,
  withBonusPoints,
  withDrawnResult,
  withPlayerMoved,
} from './mocks/mockScenarios';
import { useSoundGameState } from './hooks/useSoundGameState';
import { usePlayersProvider } from '../../providers/PlayersProvider';

const getPlayerPoints = (
  allPlayers: Player[],
  teams: [Team, Team]
): [number, number] => {
  console.log('GEt player poitns', teams, allPlayers);

  const player1Id = teams[0].id.startsWith('instant-team-')
    ? teams[0].id.split('-')[2]
    : undefined;

  const player1 = player1Id
    ? allPlayers.find(p => p.id === player1Id)
    : undefined;
  const player1Points = player1
    ? getPlayerSnakesAndLaddersMoves(player1.tags)
    : 0;

  const player2Id = teams[1].id.startsWith('instant-team-')
    ? teams[1].id.split('-')[2]
    : undefined;

  const player2 = player2Id
    ? allPlayers.find(p => p.id === player2Id)
    : undefined;
  const player2Points = player2
    ? getPlayerSnakesAndLaddersMoves(player2.tags)
    : 0;

  return [player1Points, player2Points];
};

type Props = {
  matchupId: string;
} & RouteComponentProps;

export const ScreenWithMatchup = ({ matchupId }: Props) => {
  const createdGame = useRef(false);
  const { allPlayers } = usePlayersProvider();
  const {
    subscribeToMatchup,
    currentMatchup,
    startGameForMatchup,
    playGameForMatchup,
  } = useMatchupProvider();
  const { setTheme } = useMoveThemeProvider();

  useEffect(() => {
    subscribeToMatchup(matchupId);
  }, []);

  useEffect(() => {
    if (!currentMatchup || createdGame.current) {
      return;
    }
    setTheme(currentMatchup.themeId);
    if (!currentMatchup.gameInProgress) {
      createdGame.current = true;
      startGameForMatchup(matchupId, 'Timebomb');
    }
  }, [currentMatchup]);

  console.log('LOAD SPECTATOR', currentMatchup);

  if (!currentMatchup || !currentMatchup.gameInProgress || !allPlayers.length) {
    return <LoadingSpinner />;
  }

  return (
    <Screen
      matchup={currentMatchup}
      startNewGame={() => startGameForMatchup(currentMatchup.id, 'Timebomb')}
      resolveGame={() => playGameForMatchup(currentMatchup.id)}
    />
  );
};

const Screen = ({
  matchup,
  startNewGame,
  resolveGame,
}: {
  matchup: Matchup;
  startNewGame: () => void;
  resolveGame: () => void;
}) => {
  const { allPlayers, triggerUpdate } = usePlayersProvider();
  const [playerPoints, setPlayerPoints] = useState<[number, number]>(
    getPlayerPoints(allPlayers, matchup.teams)
  );
  const timedGameState = useTimedGameState(
    matchup,
    playerPoints,
    startNewGame,
    resolveGame,
    triggerUpdate
  );
  useSoundGameState(
    timedGameState.gamePhase,
    timedGameState.game,
    timedGameState.timebomb
  );

  useEffect(() => {
    const updatedPoints = getPlayerPoints(allPlayers, matchup.teams);
    setPlayerPoints(updatedPoints);
  }, [allPlayers, matchup]);

  if (timedGameState.game) {
    return (
      <>
        {/* <button onClick={startNewGame}>new game</button> */}
        <View {...timedGameState} game={timedGameState.game} />
      </>
    );
  }

  return null;
};

export const MockScreenWithMatchup = ({  }: RouteComponentProps) => {
  const { setTheme } = useMoveThemeProvider();
  const [playerPointsState, setPlayerPointsState] = useState<[number, number]>([
    1,
    1,
  ]);
  const [mockMatchupState, setMockMatchupState] = useState(mockMatchup);
  const timedGameState = useTimedGameState(
    mockMatchupState,
    playerPointsState,
    () => {},
    () => {},
    () => {}
  );

  useEffect(() => {
    setTheme('rock-paper-scissors-classic');
  }, [mockMatchupState]);

  return (
    <>
      <div style={{ border: '1px solid black', display: 'flex' }}>
        <div style={{ padding: '5px', backgroundColor: 'red' }}>
          <button
            type="button"
            onClick={() => setMockMatchupState(mockMatchup)}
          >
            reset
          </button>
        </div>
        <div style={{ padding: '5px', backgroundColor: 'goldenrod' }}>
          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }

              setMockMatchupState(
                withDrawnResult(
                  withPlayerMoved(1)(withPlayerMoved(0)(mockMatchupState))
                )
              );
            }}
          >
            Draw without bonus points no explode
          </button>
          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }

              setMockMatchupState(
                withBonusPoints(2)(
                  withDrawnResult(
                    withPlayerMoved(1)(withPlayerMoved(0)(mockMatchupState))
                  )
                )
              );
            }}
          >
            Draw with bonus points no explode
          </button>

          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }

              setMockMatchupState({
                ...mockMatchup,
                gameInProgress: {
                  ...mockMatchupState.gameInProgress,
                  moves: [
                    {
                      ...mockMatchupState.gameInProgress.moves[0],
                      moved: true,
                    },
                    mockMatchupState.gameInProgress.moves[1],
                  ],
                },
              });
            }}
          >
            player 1 moved
          </button>
          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }
              setMockMatchupState({
                ...mockMatchup,
                gameInProgress: {
                  ...mockMatchupState.gameInProgress,
                  moves: [
                    mockMatchupState.gameInProgress.moves[0],
                    {
                      ...mockMatchupState.gameInProgress.moves[1],
                      moved: true,
                    },
                  ],
                },
              });
            }}
          >
            player 2 moved
          </button>
        </div>
        <div style={{ padding: '5px', backgroundColor: 'darkgreen' }}>
          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }

              setMockMatchupState({
                ...mockMatchupState,
                bonusPoints: 2,
                gameInProgress: {
                  ...mockMatchupState.gameInProgress,
                  result: {
                    winnerIndex: undefined,
                    draw: true,
                    moves: [
                      { moveId: 'C', powerUpId: 'NONE' },
                      { moveId: 'C', powerUpId: 'NONE' },
                    ],
                  },
                },
              });
            }}
          >
            Drawn Result
          </button>
          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }

              setMockMatchupState({
                ...mockMatchupState,
                bonusPoints: 0,
                gameInProgress: {
                  ...mockMatchupState.gameInProgress,
                  attributes: {
                    ...mockMatchupState.gameInProgress.attributes,
                    playerIndexHoldingTimebomb: 1,
                    exploded: true,
                  },
                  result: {
                    winnerIndex: 0,
                    draw: undefined,
                    moves: [
                      { moveId: 'A', powerUpId: 'NONE' },
                      { moveId: 'B', powerUpId: 'NONE' },
                    ],
                  },
                },
              });
              setPlayerPointsState([3, 1]);
            }}
          >
            Player 1 wins Result (bomb)
          </button>
          <button
            type="button"
            onClick={() => {
              if (!mockMatchupState.gameInProgress) {
                return;
              }

              setMockMatchupState({
                ...mockMatchupState,
                bonusPoints: 0,
                gameInProgress: {
                  ...mockMatchupState.gameInProgress,
                  attributes: {
                    ...mockMatchupState.gameInProgress.attributes,
                    playerIndexHoldingTimebomb: 0,
                    exploded: false,
                  },
                  result: {
                    winnerIndex: 1,
                    draw: undefined,
                    moves: [
                      { moveId: 'A', powerUpId: 'NONE' },
                      { moveId: 'C', powerUpId: 'NONE' },
                    ],
                  },
                },
              });
              setPlayerPointsState([1, 3]);
            }}
          >
            Player 2 wins Result (no bomb)
          </button>
        </div>
      </div>
      {timedGameState.game && (
        <View {...timedGameState} game={timedGameState.game} />
      )}
    </>
  );
};
