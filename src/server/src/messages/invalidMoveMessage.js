// @flow

import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const invalidMoveMessage = (): Message => {
  return {
    type: outgoingMessageTypes.INVALID_MOVE,
  };
};

export default invalidMoveMessage;
