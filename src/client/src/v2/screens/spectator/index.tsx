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
  attributes: { playerHoldingBombIndex: 0 },
  // result: {
  //   moves: [
  //     { moveId: 'A', powerUpId: 'NONE' },
  //     { moveId: 'B', powerUpId: 'NONE' },
  //   ],
  // },
};

const mockGameWithPlayer1Moved: Game = {
  ...mockGame,
  moves: [{ ...mockGame.moves[0], moved: true }, mockGame.moves[1]],
};

const mockGameWithPlayer2Moved: Game = {
  ...mockGameWithPlayer1Moved,
  moves: [
    mockGameWithPlayer1Moved.moves[0],
    { ...mockGame.moves[1], moved: true },
  ],
};

const mockGameWithResult: Game = {
  ...mockGameWithPlayer1Moved,
  ...mockGameWithPlayer2Moved,
  result: {
    moves: [
      { moveId: 'A', powerUpId: 'NONE' },
      { moveId: 'B', powerUpId: 'NONE' },
    ],
  },
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
          onClick={() => setMockGameState(mockGameWithPlayer1Moved)}
        >
          player 1 moved
        </button>
        <button
          type="button"
          onClick={() => setMockGameState(mockGameWithPlayer2Moved)}
        >
          player 2 moved
        </button>
        <button
          type="button"
          onClick={() => setMockGameState(mockGameWithResult)}
        >
          result
        </button>
      </div>
      <View game={mockGameState} />
    </>
  );
};

export default Screen;
