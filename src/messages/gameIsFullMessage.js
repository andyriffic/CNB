// @flow
import type { Message } from './MessageType';
import { GAME_IS_FULL } from './typeConstants';

const gameIsFullMessage = (): Message => {
  return {
    type: GAME_IS_FULL,
    payload: { },
  };
};

export default gameIsFullMessage;
