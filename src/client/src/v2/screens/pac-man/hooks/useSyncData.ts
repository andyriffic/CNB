import { useEffect, useRef } from 'react';
import { usePlayersProvider } from '../../../providers/PlayersProvider';
import { PacManUiState } from './usePacman/reducer';

export function useSyncData(uiState: PacManUiState, disabled: boolean) {
  const { updatePlayer, allPlayers } = usePlayersProvider();
  const saved = useRef(false);

  useEffect(() => {
    if (!saved.current && uiState.status === 'game-over' && !disabled) {
      saved.current = true;
      uiState.allPacPlayers.forEach(p => {
        const filteredTags = p.player.tags
          .filter(t => !t.startsWith('pac_moves'))
          .filter(t => !t.startsWith('pac_jail'))
          .filter(t => !t.startsWith('pac_square'))
          .filter(t => !t.startsWith('pac_pill'));

        if (p.powerPill) {
          filteredTags.push('pac_pill');
        }

        updatePlayer(p.player.id, [
          ...filteredTags,
          `pac_moves:${p.movesRemaining}`,
          `pac_jail:${p.jailTurnsCount}`,
          `pac_square:${p.pathIndex}`,
        ]);
      });

      const pacPlayer = allPlayers.find(p => p.id === 'mc_settings_face');
      if (pacPlayer) {
        updatePlayer(pacPlayer.id, [
          ...pacPlayer.tags.filter(t => !t.startsWith('pac_square')),
          `pac_square:${uiState.pacMan.pathIndex}`,
        ]);
      }
    }
  }, [uiState.status, disabled, uiState.pacMan.movesRemaining]);
}
