import { useEffect, useRef } from 'react';
import { Howl, HowlOptions } from 'howler';
import { SoundMap } from '../../../services/sound-service/soundMap';
import { play } from '../../../services/sound-service/soundService';
import { GamePhase } from './useGamePhaseTiming';
import { Game } from '../../../../uplift/contexts/MatchupProvider';

const useSoundForGamePhase = (
  gamePhase: GamePhase,
  {
    when,
    playSound,
    options,
  }: { when: GamePhase; playSound: keyof SoundMap; options?: HowlOptions }
) => {
  const playingSound = useRef<Howl | undefined>();

  useEffect(() => {
    if (gamePhase === when) {
      playingSound.current = play(playSound, options);
    } else if (playingSound.current) {
      playingSound.current.stop();
    }
  }, [gamePhase]);
};

const usePlayOncePerGame = (
  game: Game | undefined,
  playWhen: (game: Game) => boolean,
  soundKey: keyof SoundMap
) => {
  const played = useRef(game ? game.id : '');

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

export const useSoundGameState = (gamePhase: GamePhase, game?: Game) => {
  useSoundForGamePhase(gamePhase, {
    when: GamePhase.waitingMoves,
    playSound: 'WaitForMoves',
    options: { loop: true },
  });

  usePlayOncePerGame(game, game => game.moves[0].moved, 'PlayerMoved');
  usePlayOncePerGame(game, game => game.moves[1].moved, 'PlayerMoved');

  useSoundForGamePhase(gamePhase, {
    when: GamePhase.highlightWinner,
    playSound: 'Winner',
  });
};
