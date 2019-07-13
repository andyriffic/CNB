import { Game } from '../matchup/types';
import { Counter } from '../counter/types';
import { PlayResult } from './types';
import { gameResult } from '../game-result';
import { counterOperations } from '../counter';

const playGame = (
  game: Game,
  points: [Counter, Counter],
  bonusPoints: Counter
): PlayResult => {
  const result = gameResult.getWinner([
    game.moves[0].moveId!,
    game.moves[1].moveId!,
  ]);

  const updatedPoints: [Counter, Counter] = [{ ...points[0] }, { ...points[1] }];
  let updatedBonusPoints = { ...bonusPoints };

  if (result.winnerIndex !== undefined) {
    updatedPoints[result.winnerIndex] = counterOperations.incrementCounter(
      points[result.winnerIndex],
      bonusPoints.value + 1
    );
    updatedBonusPoints = counterOperations.resetCounter(updatedBonusPoints);
  }

  if (result.draw) {
    updatedBonusPoints = counterOperations.incrementCounter(updatedBonusPoints);
  }

  return {
    gameResult: result,
    points: updatedPoints,
    bonusPoints: updatedBonusPoints,
  };
};
