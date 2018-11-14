// @flow
import type { GameResult } from '../../types/GameResultType';
import type { UpdateGameResultAction } from '../../types/actions/UpdateGameResultAction';

export const UPDATE_GAME_RESULT = '[GAME_RESULT] Update Game Status';

const updateGameResultAction = (result: ?GameResult): UpdateGameResultAction => {
  return {
    type: UPDATE_GAME_RESULT,
    result,
  };
};

export default updateGameResultAction;
