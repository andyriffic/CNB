// @flow
import type { GameResult } from '../GameResultType';

export type UpdateGameResultAction = {
  type: string,
  result: ?GameResult,
};
