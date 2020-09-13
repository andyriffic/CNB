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
  attributes: { playerHoldingBombIndex: 1, exploded: true },
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
  const { game, bonusPoints, gamePhase, playerPoints } = useTimedGameState(
    mockMatchupState,
    playerPointsState
  );

  return (
    <>
      <div style={{ border: '1px solid black' }}>
        <button
          type="button"
          onClick={() => setMockMatchupState(mockMatchupState)}
        >
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
            setPlayerPointsState([2, 1]);
          }}
        >
          Player 1 wins Result
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
            setPlayerPointsState([1, 2]);
          }}
        >
          Player 2 wins Result
        </button>
        {/* <input
          type="number"
          max={1}
          min={0}
          value={mockGameState.attributes.playerHoldingBombIndex}
          onChange={e =>
            setMockGameState({
              ...mockGameState,
              attributes: {
                ...mockGameState.attributes,
                playerHoldingBombIndex: e.target.value,
              },
            })
          }
        /> */}
      </div>
      {game && (
        <View
          game={game}
          bonusPoints={bonusPoints}
          gamePhase={gamePhase}
          playerPoints={playerPoints}
        />
      )}
    </>
  );
};

export default Screen;
