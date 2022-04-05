import { useEffect, useMemo } from 'react';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { PacManUiState } from './usePacman/reducer';

export function usePacmanSound(state: PacManUiState): void {
  const { play } = useSoundProvider();

  const currentPlayer = useMemo(() => {
    const player = state.allPacPlayers.find(p => p.status === 'moving');
    return player ? player.player.name : undefined;
  }, [state]);

  const playersInJailCount = useMemo(() => {
    return state.allPacPlayers.filter(p => p.jailTurnsCount > 0).length;
  }, [state]);

  useEffect(() => {
    state.status === 'moving-pacman' && play('PacManMovePacman');
  }, [state.status]);

  useEffect(() => {
    currentPlayer && play('PacManMovePlayer');
  }, [currentPlayer]);

  useEffect(() => {
    state.status === 'moving-pacman' &&
      playersInJailCount > 0 &&
      play('PacmanEatGhost');
  }, [playersInJailCount, state.status]);
}
