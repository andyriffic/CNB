import { Game } from '../matchup/types';
import { Counter } from '../counter/types';
import { PlayResult } from './types';
import { gameResultService } from '../game-result';
import { counterService } from '../counter';

const playGame = (
  game: Game,
  points: [Counter, Counter],
  bonusPoints: Counter = counterService.createCounter('unused'),
  trophyGoal: number
): PlayResult => {
  const result = gameResultService.getWinner([
    game.moves[0].moveId!,
    game.moves[1].moveId!,
  ]);

  const updatedPoints: [Counter, Counter] = [
    { ...points[0] },
    { ...points[1] },
  ];
  let updatedBonusPoints = { ...bonusPoints };

  if (result.winnerIndex !== undefined) {
    updatedPoints[result.winnerIndex] = counterService.incrementCounter(
      points[result.winnerIndex],
      bonusPoints.value + 1
    );
    updatedBonusPoints = counterService.resetCounter(updatedBonusPoints);
  }

  if (result.draw) {
    updatedBonusPoints = counterService.incrementCounter(updatedBonusPoints);
  }

  const trophyWon =
    result.winnerIndex !== undefined &&
    updatedPoints[result.winnerIndex].value >= trophyGoal;

  return {
    gameResult: result,
    points: updatedPoints,
    bonusPoints: updatedBonusPoints,
    trophyWon,
  };
};

export const playService = {
  playGame,
};
