import { useEffect, useRef } from 'react';
import { Howl, HowlOptions } from 'howler';
import { GamePhase } from './useGamePhaseTiming';
import { Game } from '../../../providers/MatchupProvider';
import { TimebombTimedState } from './useTimedGameState';
import { PlaySound, SoundMap } from '../../../providers/SoundProvider';

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
  },
  play: PlaySound
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
  soundKey: keyof SoundMap,
  play: PlaySound
) => {
  const played = useRef('');

  useEffect(() => {
    if (!game) {
      return;
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
  timebomb: TimebombTimedState,
  play: PlaySound
) => {
  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.waitingMoves,
      playSound: 'WaitForMoves',
      stopWhenPhaseEnds: true,
      options: { loop: true },
    },
    play
  );

  usePlayOncePerGame(
    game,
    timebomb,
    game => game.moves[0].moved,
    'PlayerMoved',
    play
  );
  usePlayOncePerGame(
    game,
    timebomb,
    game => game.moves[1].moved,
    'PlayerMoved',
    play
  );

  usePlayOncePerGame(
    game,
    timebomb,
    (game, timebomb) => timebomb.exploded,
    'TimebombExploded',
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.readyToPlay,
      playSound: 'RoundStart',
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.showResult,
      playSound: 'ShowMoves',
      options: {
        rate: 1.5,
      },
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.highlightWinner,
      playSound: 'Winner',
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.highlightDraw,
      playSound: 'Draw',
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.showBasePoints,
      playSound: 'ShowBasePoints',
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.givePointsToPlayer,
      playSound: 'FinalPointsAllocated',
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.timebombFuse,
      playSound: 'TimebombTicking',
      sprite: 'fuse',
      options: {
        sprite: {
          fuse: [0, 2500],
        },
      },
    },
    play
  );

  useSoundForGamePhase(
    gamePhase,
    {
      when: GamePhase.gameOver,
      playSound: 'GameOver',
    },
    play
  );
};
