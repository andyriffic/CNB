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

  const headToHead = useMemo<boolean>(() => {
    if (!game) {
      return false;
    }
    return (
      !game.currentPlayer.cardPlayed &&
      game.allPlayers.filter(p => p.status === 'alive').length === 2
    );
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
      play(
        selectRandomOneOf(['GasPlayerDie1', 'GasPlayerDie2', 'GasPlayerDie3'])
      );
    }
  }, [exploded]);

  // useEffect(() => {
  //   if (cardPlayed) {
  //     play('GasPlayNumberCard');
  //   }
  // }, [cardPlayed]);

  useEffect(() => {
    if (hasWinner) {
      play('GasWinner');
    }
  }, [hasWinner]);

  useEffect(() => {
    if (!!playingSounds.current['head-to-head']) {
      return;
    }

    if (headToHead) {
      playingSounds.current['head-to-head'] = play('PowerMode');
    }
  }, [headToHead]);

  useEffect(() => {
    if (gameInProgress) {
      playingSounds.current['background-music'] = play(
        'GasCloudGameBackgroundMusic',
        { loop: true }
      );
    }
  }, [gameInProgress]);
}
