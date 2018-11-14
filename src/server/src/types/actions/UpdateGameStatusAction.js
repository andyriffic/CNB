// @flow
import type { GameStatus } from '../GameStatusType';

export type UpdateGameStatusAction = {
  type: string,
  gameStatus: GameStatus,
};
