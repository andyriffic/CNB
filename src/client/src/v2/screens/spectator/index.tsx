import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import {
  MatchupContext,
  Game,
  GAME_STATUS,
  Matchup,
} from '../../../uplift/contexts/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useTimedGameState } from './useTimedGameState';

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

const Screen = ({ matchupId }: Props) => {
  //   const { subscribeToMatchup, currentMatchup } = useContext(MatchupContext);

  //   useEffect(() => {
  //     subscribeToMatchup(matchupId);
  //   }, []);

  //   if (!currentMatchup || !currentMatchup.gameInProgress) {
  //     return <LoadingSpinner />;
  //   }
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

export default Screen;
