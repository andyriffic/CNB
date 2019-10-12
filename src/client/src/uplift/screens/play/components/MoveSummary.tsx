import React from 'react';
import { SpectatorMove } from '../../../contexts/MatchupProvider';

export const MoveSummary = ({ move }: { move: SpectatorMove }) => {
  return (
    <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
      <p>
        <strong>{move.playerName}</strong> played for your team
        <br />
        Watch the Main screen for the result
      </p>
      <p>
        <span style={{ display: 'block', fontSize: '5rem' }}>🤞</span>
      </p>
      <p>祝好運</p>
    </div>
  );
};
