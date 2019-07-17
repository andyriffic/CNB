import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MatchupContext } from '../socket-context/MatchupProvider';

const moves = ['A', 'B', 'C'];

export const PlayerPlayView = ({ playerId, matchup }) => {
  const { game, watchMatchupGame, makeMove } = useContext(MatchupContext);

  useEffect(() => {
    watchMatchupGame(matchup.id);
  }, []);

  return (
    <div>
      {game && <p>{game.id}</p>}
      <h3>{matchup.playerTeamId}</h3>
      <div>
        {moves.map(m => (
          <button
            type="button"
            key={m}
            onClick={() =>
              makeMove(matchup.id, matchup.playerTeamId, {
                playerId: playerId,
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
