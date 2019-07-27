import React from 'react';
import { SpectatorMove } from '../../../contexts/MatchupProvider';

export const MoveSummary = ({ move }: { move: SpectatorMove }) => {
  return <p>{move.playerName} has already made a move</p>;
};
