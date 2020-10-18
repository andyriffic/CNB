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
  const loserIndex = [1, 0][winnerIndex];
  if (game.moves[winnerIndex].powerUpId === 'DOUBLE_POINTS') {
    //Being terribly lazy and just mutate object 😬
    playResult.points[winnerIndex].value *= 2;
    playResult.pointDiffs[winnerIndex] *= 2;
  }

  if (game.moves[winnerIndex].powerUpId === 'POINT_STEALER') {
    //Being terribly lazy and just mutate object 😬
    if (playResult.points[loserIndex].value > 0) {
      playResult.points[winnerIndex].value += 1;
      playResult.pointDiffs[winnerIndex] += 1;
      playResult.points[loserIndex].value -= 1;
      playResult.pointDiffs[loserIndex] = -1;
    }
  }

  return playResult;
};

export const getRandomPowerup = () => {
  return 'DOUBLE_POINTS';
  // const weightedPowerups = [
  //   {
  //     item: 'POINT_STEALER',
  //     weight: 5,
  //   },
  //   {
  //     item: 'DOUBLE_POINTS',
  //     weight: 3,
  //   },
  //   {
  //     item: 'SHORT_FUSE',
  //     weight: 2,
  //   },
  // ];

  // return selectWeightedRandomOneOf(weightedPowerups);
};
