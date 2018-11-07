// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const gameResetMessage = (): Message => {
  return {
    type: outgoingMessageTypes.GAME_RESET,
    payload: { },
    recipients: {
      all: true,
    },
  };
};

export default gameResetMessage;
