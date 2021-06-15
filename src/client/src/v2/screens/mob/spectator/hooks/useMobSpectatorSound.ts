import { Howl } from 'howler';
import { useEffect, useMemo, useRef } from 'react';
import { MobGame } from '../../../../providers/MobProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';
import { MobSpectatorViewUiState } from './useMobSpectatorViewUiState';

export function useMobSpectatorSound(
  mobGame: MobGame | undefined,
  uiState: MobSpectatorViewUiState
) {
  const { play } = useSoundProvider();
  const totalActivePlayerMoves = useMemo(() => {
    if (!mobGame) return 0;
    if (mobGame.roundState !== 'waiting-moves') return 0;
    return mobGame.mobPlayers.filter(mp => mp.active && !!mp.lastMoveId).length;
  }, [mobGame]);
  const playingSounds = useRef<{ [id: string]: Howl }>({});

  useEffect(() => {
    if (totalActivePlayerMoves > 0) {
      play('PlayerMoved');
    }
  }, [totalActivePlayerMoves]);

  useEffect(() => {
    if (playingSounds.current['music']) return;
    if (mobGame && mobGame.roundState === 'waiting-moves') {
      playingSounds.current['music'] = play('MobWaitingMovesMusic', {
        loop: true,
      });
    }
  }, [mobGame]);

  useEffect(() => {
    if (mobGame && mobGame.roundState === 'ready-to-play') {
      !!playingSounds.current['music'] && playingSounds.current['music'].stop();
      delete playingSounds.current['music'];
      play('MobStart');
    }
  }, [mobGame]);

  useEffect(() => {
    if (!mobGame || !!playingSounds.current['mug-winner-music']) return;

    if (mobGame.roundState === 'viewed' && uiState.mugWinner) {
      playingSounds.current['mug-winner-music'] = play('MugWinsMusic', {
        loop: true,
      });
    }
  }, [mobGame, uiState]);

  useEffect(() => {
    if (!mobGame || !!playingSounds.current['mob-winner-music']) return;

    if (mobGame.roundState === 'viewed' && uiState.mobWinner) {
      playingSounds.current['mob-winner-music'] = play('MobWinsMusic', {
        loop: true,
      });
    }
  }, [mobGame, uiState]);

  useEffect(() => {
    return () => {
      playingSounds.current['mob-winner-music'] &&
        playingSounds.current['mob-winner-music'].stop();
      playingSounds.current['mug-winner-music'] &&
        playingSounds.current['mug-winner-music'].stop();
    };
  }, []);
}
