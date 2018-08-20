// @flow

import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const successfulMoveMessage = (): Message => {
  return {
    type: outgoingMessageTypes.SUCCESSFUL_MOVE,
  };
};

export default successfulMoveMessage;
