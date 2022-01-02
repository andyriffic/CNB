import { Howl } from 'howler';
import { useEffect, useMemo, useRef } from 'react';
import { GasCard, GasGame } from '../../../../providers/GasProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';

export function useGasSound(game: GasGame | undefined) {
  const { play } = useSoundProvider();
  const lastPlayerPlayedCardRef = useRef<string | undefined>();

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

  const cardPlayed = useMemo<boolean>(() => {
    if (!game) {
      return false;
    }

    if (!game.currentPlayer.cardPlayed) {
      return false;
    }

    if (lastPlayerPlayedCardRef.current === game.currentPlayer.id) {
      return false;
    }

    lastPlayerPlayedCardRef.current = game.currentPlayer.id;
    return true;
  }, [game]);

  useEffect(() => {
    if (pressedCount > 0) {
      const intensity = pressedCount / 100 + 0.5;
      play('GasCloudPress', { rate: intensity });
    }
  }, [pressedCount]);

  useEffect(() => {
    if (exploded) {
      play('GasCloudExplode');
    }
  }, [exploded]);

  useEffect(() => {
    if (cardPlayed) {
      play('GasPlayCard');
    }
  }, [cardPlayed]);
}
