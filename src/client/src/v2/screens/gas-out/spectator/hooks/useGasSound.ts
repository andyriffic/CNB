import { Howl } from 'howler';
import { useEffect, useMemo, useRef } from 'react';
import { selectRandomOneOf } from '../../../../../uplift/utils/random';
import { GasCard, GasGame } from '../../../../providers/GasProvider';
import {
  SoundMap,
  useSoundProvider,
} from '../../../../providers/SoundProvider';

export function useGasSound(game: GasGame | undefined) {
  const playingSounds = useRef<{ [id: string]: Howl }>({});

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

  const hasWinner = useMemo<boolean>(() => {
    if (!game) {
      return false;
    }

    return !!game.winningPlayerId;
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

  const gameInProgress = useMemo<boolean>(() => {
    if (!game) {
      return false;
    }
    if (game.gasCloud.exploded || !!game.winningPlayerId) {
      return false;
    }

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
      playingSounds.current['background-music'] &&
        playingSounds.current['background-music'].stop();
      play('GasCloudExplode01');
      play(selectRandomOneOf(['MobLose_1', 'MobLose_2', 'MobLose_3']));
    }
  }, [exploded]);

  useEffect(() => {
    if (cardPlayed) {
      play('GasPlayCard');
    }
  }, [cardPlayed]);

  useEffect(() => {
    if (hasWinner) {
      play('GasWinner');
    }
  }, [hasWinner]);

  useEffect(() => {
    if (gameInProgress) {
      playingSounds.current['background-music'] = play(
        'GasCloudGameBackgroundMusic',
        { loop: true }
      );
    }
  }, [gameInProgress]);
}
