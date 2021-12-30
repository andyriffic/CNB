import { Howl } from 'howler';
import { useEffect, useMemo, useRef } from 'react';
import { GasGame } from '../../../../providers/GasProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';

export function useGasSound(game: GasGame | undefined) {
  const { play } = useSoundProvider();

  const pressedCount = useMemo<number>(() => {
    if (!game || game.gasCloud.exploded) {
      return 0;
    }

    return game.gasCloud.pressed;
  }, [game]);

  const exploded = useMemo<boolean>(() => {
    if (!game) {
      return false;
    }

    return game.gasCloud.exploded;
  }, [game]);

  useEffect(() => {
    if (pressedCount > 0) {
      const intensity = pressedCount / 100 + 0.5;
      play('GasCloudPress', { volume: 0.1, rate: intensity });
    }
  }, [pressedCount]);

  useEffect(() => {
    if (exploded) {
      play('GasCloudExplode');
    }
  }, [exploded]);
}
