import React from 'react';
import { SpectatorMove } from '../../../contexts/MatchupProvider';

export const GameWaitingOnPlayers = ({
  moves,
}: {
  moves: [SpectatorMove, SpectatorMove];
}) => {
  return (
    <p>
      {moves[0].playerName} / {moves[1].playerName}
    </p>
  );
};
