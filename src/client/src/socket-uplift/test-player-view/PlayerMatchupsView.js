import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
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
        playerMatchups.map(mu => (
          <p
            key={mu.id}
            onClick={() => selectMatchup(mu)}
            style={{ cursor: 'pointer' }}
          >
            {mu.teams[0].name} <strong>vs</strong> {mu.teams[1].name}{' '}
            {mu.gameInProgress ? '✅' : '❌'}
          </p>
        ))}
    </div>
  );
};
