// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const gameIsFullMessage = (): Message => {
  return {
    type: outgoingMessageTypes.GAME_IS_FULL,
    payload: { },
  };
};

export default gameIsFullMessage;
