import { useEffect, useMemo } from 'react';
import { MobGame } from '../../../../providers/MobProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';

export function useMobSpectatorSound(mobGame?: MobGame) {
  const { play } = useSoundProvider();
  const totalActivePlayerMoves = useMemo(() => {
    if (!mobGame) return 0;
    if (mobGame.roundState !== 'waiting-moves') return 0;
    return mobGame.mobPlayers.filter(mp => mp.active && !!mp.lastMoveId).length;
  }, [mobGame]);

  useEffect(() => {
    if (totalActivePlayerMoves > 0) {
      play('PlayerMoved');
    }
  }, [totalActivePlayerMoves]);

  useEffect(() => {
    if (mobGame && mobGame.roundState === 'waiting-moves') {
      const waitingMusic = play('WaitForMoves', { loop: true });

      return () => {
        waitingMusic.stop();
      };
    }
  }, [mobGame]);

  useEffect(() => {
    if (mobGame && mobGame.roundState === 'ready-to-play') {
      play('MobStart');
    }
  }, [mobGame]);
}
