import React, { useContext } from 'react';
import { DebugView } from './DebugView';

const moves = ['A', 'B', 'C'];

export const TeamMoveView = ({ move, player, makeMove, matchupId }) => {
  return (
    <div>
      <h3>{player}</h3>
      <DebugView title={`MOVE: ${move.teamId}`} value={move} />
      <div>
        {moves.map(m => (
          <button
            type="button"
            key={m}
            onClick={() =>
              makeMove(matchupId, move.teamId, {
                playerId: player,
                moveId: m,
                powerUpId: 'NONE',
              })
            }
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};
