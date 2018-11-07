// @flow
import type { ResetGameAction } from '../../types/actions/ResetGameAction';

export const RESET_GAME = '[GAME] Reset Game';

const resetGameAction = (): ResetGameAction => {
  return {
    type: RESET_GAME,
  };
};

export default resetGameAction;
