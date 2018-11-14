// @flow
import type { Player } from './PlayerType';
import type { GameStatus } from './GameStatusType';

export type Game = {
  player1: Player,
  player2: Player,
  status: GameStatus,
};
