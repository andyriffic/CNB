import React from 'react';
import {
  Matchup,
  useMatchupProvider,
} from '../../../providers/MatchupProvider';

const moveIds = ['A', 'B', 'C'];

export const DebugPlayerMove = ({ matchup }: { matchup: Matchup }) => {
  const { makeMove } = useMatchupProvider();
  if (!matchup.gameInProgress) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      {matchup.gameInProgress.moves.map(move => (
        <div
          key={move.playerId!}
          style={{ border: '1px solid black', padding: '3px' }}
        >
          <div>{move.playerId}</div>
          <div style={{ display: 'flex' }}>
            {moveIds.map(m => (
              <button
                key={m}
                onClick={() =>
                  makeMove(
                    matchup.id,
                    matchup.teams.find(t =>
                      t.playerNames.includes(move.playerName!)
                    )!.id,
                    { playerId: move.playerId!, moveId: m, powerUpId: 'NONE' }
                  )
                }
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
