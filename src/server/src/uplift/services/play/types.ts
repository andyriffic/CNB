import { Counter } from '../counter/types';
import { GameResult } from '../game-result/types';

export type PlayResult = {
  gameResult: GameResult;
  points: [Counter, Counter];
  pointDiffs: [number, number];
  trophies: [Counter, Counter];
  bonusPoints: Counter;
  trophyWon: boolean;
};
