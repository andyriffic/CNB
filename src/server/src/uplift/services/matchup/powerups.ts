import { PlayResult } from '../play/types';
import { Game } from './types';
import { selectWeightedRandomOneOf } from '../../utils/random';

export const adjustPlayResultForPowerups = (
  game: Game,
  playResult: PlayResult
): PlayResult => {
  if (game.result!.draw) {
    return playResult;
  }

  const winnerIndex = game.result!.winnerIndex!;
  if (game.moves[winnerIndex].powerUpId === 'DOUBLE_POINTS') {
    //Being terribly lazy and just mutate object 😬
    playResult.points[winnerIndex].value *= 2;
    playResult.pointDiffs[winnerIndex] *= 2;
  }

  return playResult;
};

export const getRandomPowerup = () => {
  const weightedPowerups = [
    {
      item: 'DOUBLE_POINTS',
      weight: 1,
    },
  ];

  return selectWeightedRandomOneOf(weightedPowerups);
};
