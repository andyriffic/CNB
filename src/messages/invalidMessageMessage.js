// @flow

import type { Message } from './MessageType';
import { INVALID_MESSAGE } from './typeConstants';

const invalidMessageMessage = (): Message => {
  return {
    type: INVALID_MESSAGE,
  };
};

export default invalidMessageMessage;
