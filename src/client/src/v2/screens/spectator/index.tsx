import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import {
  MatchupContext,
  Game,
  GAME_STATUS,
} from '../../../uplift/contexts/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';

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
  attributes: { playerHoldingBombIndex: 1 },
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

  const [mockGameState, setMockGameState] = useState(mockGame);

  return (
    <>
      <div style={{ border: '1px solid black' }}>
        <button type="button" onClick={() => setMockGameState(mockGame)}>
          start
        </button>
        <button
          type="button"
          onClick={() =>
            setMockGameState({
              ...mockGameState,
              moves: [
                { ...mockGameState.moves[0], moved: true },
                mockGameState.moves[1],
              ],
            })
          }
        >
          player 1 moved
        </button>
        <button
          type="button"
          onClick={() =>
            setMockGameState({
              ...mockGameState,
              moves: [
                mockGameState.moves[0],
                { ...mockGameState.moves[1], moved: true },
              ],
            })
          }
        >
          player 2 moved
        </button>
        <button
          type="button"
          onClick={() =>
            setMockGameState({
              ...mockGameState,
              result: {
                winnerIndex: 0,
                moves: [
                  { moveId: 'A', powerUpId: 'NONE' },
                  { moveId: 'B', powerUpId: 'NONE' },
                ],
              },
            })
          }
        >
          result
        </button>
        <input
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
        />
      </div>
      <View game={mockGameState} />
    </>
  );
};

export default Screen;
