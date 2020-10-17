import { useEffect, useRef } from 'react';
import { Howl, HowlOptions } from 'howler';
import { SoundMap } from '../../../../../services/sound-service/soundMap';
import { play } from '../../../../../services/sound-service/soundService';
import { GamePhase } from '../../../hooks/useGamePhaseTiming';
import { Game } from '../../../../../providers/MatchupProvider';
import { TimebombTimedState } from './useTimedGameState';

const useSoundForGamePhase = (
  gamePhase: GamePhase,
  {
    when,
    playSound,
    stopWhenPhaseEnds = false,
    sprite,
    options,
  }: {
    when: GamePhase;
    playSound: keyof SoundMap;
    sprite?: string;
    stopWhenPhaseEnds?: boolean;
    options?: HowlOptions;
  }
) => {
  const playingSound = useRef<Howl | undefined>();

  useEffect(() => {
    if (gamePhase === when) {
      playingSound.current = play(playSound, options, sprite);
    } else if (stopWhenPhaseEnds && playingSound.current) {
      playingSound.current.stop();
    }
  }, [gamePhase]);
};

const usePlayOncePerGame = (
  game: Game | undefined,
  playWhen: (game: Game) => boolean,
  soundKey: keyof SoundMap
) => {
  const played = useRef('');

  useEffect(() => {
    if (!game) {
      return;
    }
    if (played.current !== game.id && playWhen(game)) {
      played.current = game.id;
      play(soundKey);
    }
  }, [game]);
};

export const useSoundGameState = (
  gamePhase: GamePhase,
  game: Game | undefined
) => {
  useSoundForGamePhase(gamePhase, {
    when: GamePhase.waitingMoves,
    playSound: 'WaitForMoves',
    stopWhenPhaseEnds: true,
    options: { loop: true },
  });

  usePlayOncePerGame(game, game => game.moves[0].moved, 'PlayerMoved');
  usePlayOncePerGame(game, game => game.moves[1].moved, 'PlayerMoved');

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.readyToPlay,
    playSound: 'RoundStart',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.showResult,
    playSound: 'ShowMoves',
    options: {
      rate: 1.5,
    },
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.tugoWarYankPlayer,
    playSound: 'PullRope',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.tugoWarPlayerFalls,
    playSound: 'Fall',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.highlightWinner,
    playSound: 'Winner',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.highlightDraw,
    playSound: 'Draw',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.showBasePoints,
    playSound: 'ShowBasePoints',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.givePointsToPlayer,
    playSound: 'FinalPointsAllocated',
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.timebombFuse,
    playSound: 'TimebombTicking',
    sprite: 'fuse',
    options: {
      sprite: {
        fuse: [0, 2500],
      },
    },
  });

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.gameOver,
    playSound: 'GameOver',
  });
};
