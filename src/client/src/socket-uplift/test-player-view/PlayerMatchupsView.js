import React, { useContext, useEffect } from 'react';
import { MatchupContext } from '../socket-context/MatchupProvider';

export const PlayerMatchupsView = ({ playerId, selectMatchup }) => {
  const { requestMatchupsForPlayer, playerMatchups } = useContext(
    MatchupContext
  );

  useEffect(() => {
    requestMatchupsForPlayer(playerId);
  }, []);

  return (
    <div>
      <h2>{playerId}</h2>
      {playerMatchups &&
        playerMatchups.map(mu => {
          const gameEnabled =
            mu.gameInProgress && mu.gameInProgress.status !== 'Finished';
          const gameFinished =
            mu.gameInProgress && mu.gameInProgress.status === 'Finished';

          return (
            <p
              key={mu.id}
              onClick={() => gameEnabled && selectMatchup(mu)}
              style={{ cursor: 'pointer' }}
            >
              {mu.teams[0].name} <strong>vs</strong> {mu.teams[1].name}{' '}
              {gameEnabled ? '✅' : gameFinished ? '🏁' : '❌'}
            </p>
          );
        })}
    </div>
  );
};
