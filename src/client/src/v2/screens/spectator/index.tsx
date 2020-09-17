import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import {
  MatchupContext,
  Game,
  GAME_STATUS,
  Matchup,
  Team,
} from '../../../uplift/contexts/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useTimedGameState } from './useTimedGameState';
import {
  Player,
  PlayersContext,
} from '../../../uplift/contexts/PlayersProvider';
import { getPlayerSnakesAndLaddersMoves } from '../../../uplift/utils/player';

const getPlayerPoints = (
  allPlayers: Player[],
  teams: [Team, Team]
): [number, number] => {
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

const mockGame: Game = {
  id: 'test-game',
  status: GAME_STATUS.WaitingPlayerMoves,
  moves: [
    {
      moved: false,
      playerAvatarUrl: '/players/andy.png',
      playerId: 'andy',
      playerName: 'Andy',
      usedPowerup: false,
    },
    {
      moved: false,
      playerAvatarUrl: '/players/dunny.png',
      playerId: 'dunny',
      playerName: 'Dunny',
      usedPowerup: false,
    },
  ],
  playMode: 'Timebomb',
  trophyReset: false,
  trophyWon: false,
  viewed: false,
  attributes: { playerIndexHoldingTimebomb: 1, exploded: false },
};

const mockMatchup: Matchup = {
  id: 'blah',
  teams: [
    {
      id: '1',
      name: 'team 1',
      points: 0,
      trophies: 0,
      tags: [],
      playerNames: [],
    },
    {
      id: '2',
      name: 'team 2',
      points: 0,
      trophies: 0,
      tags: [],
      playerNames: [],
    },
  ],
  gameInProgress: mockGame,
  trophyGoal: 0,
  bonusPoints: 1,
  themeId: 'rps',
};

type Props = {
  matchupId: string;
} & RouteComponentProps;

const ScreenWithMatchup = ({ matchupId }: Props) => {
  const { subscribeToMatchup, currentMatchup } = useContext(MatchupContext);

  useEffect(() => {
    subscribeToMatchup(matchupId);
  }, []);

  if (!currentMatchup || !currentMatchup.gameInProgress) {
    return <LoadingSpinner />;
  }

  return <Screen matchup={currentMatchup} />;
};

const Screen = ({ matchup }: { matchup: Matchup }) => {
  const { allPlayers } = useContext(PlayersContext);
  const [playerPoints, setPlayerPoints] = useState<[number, number]>(
    getPlayerPoints(allPlayers, matchup.teams)
  );
  const timedGameState = useTimedGameState(matchup, playerPoints);

  useEffect(() => {
    setPlayerPoints(getPlayerPoints(allPlayers, matchup.teams));
  }, [allPlayers, matchup]);

  if (timedGameState.game) {
    return <View {...timedGameState} game={timedGameState.game} />;
  }

  return null;
};

const MockScreen = () => {
  const [playerPointsState, setPlayerPointsState] = useState<[number, number]>([
    1,
    1,
  ]);
  const [mockMatchupState, setMockMatchupState] = useState(mockMatchup);
  const timedGameState = useTimedGameState(mockMatchupState, playerPointsState);

  return (
    <>
      <div style={{ border: '1px solid black' }}>
        <button type="button" onClick={() => setMockMatchupState(mockMatchup)}>
          start
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
                  { ...mockMatchupState.gameInProgress.moves[0], moved: true },
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
                  { ...mockMatchupState.gameInProgress.moves[1], moved: true },
                ],
              },
            });
          }}
        >
          player 2 moved
        </button>
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
      {timedGameState.game && (
        <View {...timedGameState} game={timedGameState.game} />
      )}
    </>
  );
};

export default ScreenWithMatchup;
