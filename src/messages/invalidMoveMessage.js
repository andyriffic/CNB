// @flow

import type { Message } from './MessageType';
import { INVALID_MOVE } from './typeConstants';

const invalidMoveMessage = (): Message => {
  return {
    type: INVALID_MOVE,
  };
};

export default invalidMoveMessage;
