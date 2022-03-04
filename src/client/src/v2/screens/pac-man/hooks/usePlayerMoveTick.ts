import { useEffect } from 'react';
import { UsePacMan } from './usePacman';
import { PacManUiState } from './usePacman/reducer';

export function usePlayerAutoMove(
  { uiState, movePlayer, movePacman }: UsePacMan,
  moveSpeedMilliseconds: number = 250
): void {
  useEffect(() => {
    if (uiState.status !== 'moving-players') {
      return;
    }

    const interval = setInterval(() => {
      console.log('Tick-player');

      movePlayer();
    }, moveSpeedMilliseconds);
    return () => clearInterval(interval);
  }, [uiState.status]);

  useEffect(() => {
    if (uiState.status !== 'moving-pacman') {
      return;
    }

    const interval = setInterval(() => {
      console.log('Tick-pacman');

      movePacman();
    }, moveSpeedMilliseconds);
    return () => clearInterval(interval);
  }, [uiState.status]);
}
