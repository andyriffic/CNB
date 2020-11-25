import { useEffect, useRef } from 'react';
import { Howl, HowlOptions } from 'howler';
import { GamePhase } from '../../../hooks/useGamePhaseTiming';
import { Game } from '../../../../../providers/MatchupProvider';
import { PlaySound, SoundMap } from '../../../../../providers/SoundProvider';

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
  playWhen: (game: Game) => boolean,
  soundKey: keyof SoundMap,
  play: PlaySound
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
  game: Game | undefined,
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

  usePlayOncePerGame(game, game => game.moves[0].moved, 'PlayerMoved', play);
  usePlayOncePerGame(game, game => game.moves[1].moved, 'PlayerMoved', play);

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
      when: GamePhase.gameOver,
      playSound: 'GameOver',
    },
    play
  );
};
