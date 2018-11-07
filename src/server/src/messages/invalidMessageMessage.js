// @flow

import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const invalidMessageMessage = (): Message => {
  return {
    type: outgoingMessageTypes.INVALID_MESSAGE,
  };
};

export default invalidMessageMessage;
