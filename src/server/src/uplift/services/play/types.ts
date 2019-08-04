import { Counter } from '../counter/types';
import { GameResult } from '../game-result/types';

export type PlayResult = {
  gameResult: GameResult;
  points: [Counter, Counter];
  trophies: [Counter, Counter];
  bonusPoints: Counter;
  trophyWon: boolean;
};
