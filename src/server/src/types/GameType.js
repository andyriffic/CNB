// @flow
import type { Player } from './PlayerType';
import type { GameStatus } from './GameStatusType';
import type { GameResult } from './GameResultType';

export type Game = {
  player1: Player,
  player2: Player,
  status: GameStatus,
  result?: ?GameResult,
};
