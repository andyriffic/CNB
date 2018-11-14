// @flow
import type { GameStatus } from '../../types/GameStatusType';
import type { UpdateGameStatusAction } from '../../types/actions/UpdateGameStatusAction';

export const UPDATE_GAME_STATUS = '[GAME_STATUS] Update Game Status';

const updateGameStatusAction = (gameStatus: GameStatus): UpdateGameStatusAction => {
  return {
    type: UPDATE_GAME_STATUS,
    gameStatus,
  };
};

export default updateGameStatusAction;
