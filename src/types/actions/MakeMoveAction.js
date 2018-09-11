// @flow
import type { Move } from '../MoveType';

export type MakeMoveAction = {
  type: string,
  slot: string,
  move: Move,
};
