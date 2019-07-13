import React, { useContext } from 'react';
import { DebugView } from './DebugView';
import { GameContext } from '../socket-context/GameProvider';

export const GameView = ({ matchupId }) => {
  const { game, startNewGame } = useContext(GameContext);
  if (!game) {
    return (
      <div>
        No game for matchup {matchupId}{' '}
        <button type="button" onClick={() => startNewGame(matchupId)}>
          Start Game
        </button>
      </div>
    );
  }

  return <DebugView title={`GAME: ${game.id}`} value={game} />;
};
