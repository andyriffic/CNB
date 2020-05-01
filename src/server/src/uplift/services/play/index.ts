import { Game, PLAY_MODE } from '../matchup/types';
import { Counter } from '../counter/types';
import { PlayResult } from './types';
import { gameResultService } from '../game-result';
import { counterService } from '../counter';

const playGame = (
  game: Game,
  points: [Counter, Counter],
  trophies: [Counter, Counter],
  bonusPoints: Counter,
  trophyGoal: number
): PlayResult => {
  const pointDiffs: [number, number] = [0, 0];

  const result = gameResultService.getWinner([
    game.moves[0].moveId!,
    game.moves[1].moveId!,
  ]);

  const updatedPoints: [Counter, Counter] = [
    { ...points[0] },
    { ...points[1] },
  ];
  let updatedBonusPoints = { ...bonusPoints };

  console.log('UPDATED POINTS (1)', updatedPoints);

  if (result.winnerIndex !== undefined) {
    pointDiffs[result.winnerIndex] = bonusPoints.value + 1;
    updatedPoints[result.winnerIndex] = counterService.incrementCounter(
      points[result.winnerIndex],
      pointDiffs[result.winnerIndex]
    );
    updatedBonusPoints = counterService.resetCounter(updatedBonusPoints);
  }

  console.log('UPDATED POINTS (2)', updatedPoints);

  if (result.draw) {
    updatedBonusPoints = counterService.incrementCounter(updatedBonusPoints);
  }

  const trophyWon =
    game.playMode === PLAY_MODE.Standard &&
    result.winnerIndex !== undefined &&
    updatedPoints[result.winnerIndex].value >= trophyGoal;

  let updatedTrophies: [Counter, Counter] = [
    { ...trophies[0] },
    { ...trophies[1] },
  ];

  if (trophyWon && result.winnerIndex !== undefined) {
    updatedTrophies[result.winnerIndex] = counterService.incrementCounter(
      trophies[result.winnerIndex],
      1
    );
  }

  console.log('UPDATED POINTS (3)', updatedPoints);

  return {
    gameResult: result,
    points: updatedPoints,
    bonusPoints: updatedBonusPoints,
    pointDiffs,
    trophies: updatedTrophies,
    trophyWon,
  };
};

export const playService = {
  playGame,
};
