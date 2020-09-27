import { useState, useEffect } from 'react';
import { RelativePosition } from '../components/PositionedArea';
import { TimebombTimedState } from './useTimedGameState';

const timebombPositions: [RelativePosition, RelativePosition] = [
  { bottom: 0, left: 10 },
  { bottom: 0, left: 85 },
];

export const usePositionedTimebomb = (
  timebomb: TimebombTimedState
): RelativePosition => {
  return timebombPositions[timebomb.playerIndexHoldingTimebomb];
};
