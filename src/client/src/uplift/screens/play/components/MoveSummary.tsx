import React from 'react';
import { SpectatorMove } from '../../../contexts/MatchupProvider';

export const MoveSummary = ({ move }: { move: SpectatorMove }) => {
  return (
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>
      <p>
        Watch the Main screen for the result
        <span
          style={{ display: 'block', fontSize: '5rem' }}
        >
          🤞
        </span>
      </p>
    </div>
  );
};
