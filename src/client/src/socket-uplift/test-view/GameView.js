import React, { useContext, useEffect } from 'react';
import { DebugView } from './DebugView';
import { GameContext } from '../socket-context/GameProvider';
import { TeamMoveView } from './TeamMoveView';

export const GameView = ({ matchupId }) => {
  const { game, watchMatchupGame, startNewGame, makeMove } = useContext(
    GameContext
  );

  useEffect(() => {
    watchMatchupGame(matchupId);
  }, []);

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

  return (
    <div>
      <DebugView title={`GAME: ${game.id}`} value={game} />
      <TeamMoveView
        player="player 1"
        matchupId={matchupId}
        move={game.moves[0]}
        makeMove={makeMove}
      />
      <TeamMoveView
        player="player 2"
        matchupId={matchupId}
        move={game.moves[1]}
        makeMove={makeMove}
      />
    </div>
  );
};
