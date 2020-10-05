import { useEffect, useRef } from 'react';
import { Howl, HowlOptions } from 'howler';
import { SoundMap } from '../../../services/sound-service/soundMap';
import { play } from '../../../services/sound-service/soundService';
import { GamePhase } from './useGamePhaseTiming';
import { Game } from '../../../providers/MatchupProvider';
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
  timebomb: TimebombTimedState,
  playWhen: (game: Game, timebomb: TimebombTimedState) => boolean,
  soundKey: keyof SoundMap
) => {
  const played = useRef('');

  useEffect(() => {
    if (!game) {
      return;
    }
    if (soundKey === 'TimebombExploded') {
      console.log(
        'TIMEBOMB SOUND',
        played.current,
        game.id,
        playWhen(game, timebomb)
      );
    }
    if (played.current !== game.id && playWhen(game, timebomb)) {
      played.current = game.id;
      play(soundKey);
    }
  }, [game, timebomb]);
};

export const useSoundGameState = (
  gamePhase: GamePhase,
  game: Game | undefined,
  timebomb: TimebombTimedState
) => {
  useSoundForGamePhase(gamePhase, {
    when: GamePhase.waitingMoves,
    playSound: 'WaitForMoves',
    stopWhenPhaseEnds: true,
    options: { loop: true },
  });

  usePlayOncePerGame(
    game,
    timebomb,
    game => game.moves[0].moved,
    'PlayerMoved'
  );
  usePlayOncePerGame(
    game,
    timebomb,
    game => game.moves[1].moved,
    'PlayerMoved'
  );

  usePlayOncePerGame(
    game,
    timebomb,
    (game, timebomb) => timebomb.exploded,
    'TimebombExploded'
  );

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
