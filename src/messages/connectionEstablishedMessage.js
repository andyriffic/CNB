// @flow
import type { Message } from './MessageType';
import { incomingMessageTypes } from './typeConstants';

const connectionEstablished = (): Message => {
  return {
    type: incomingMessageTypes.CONNECTION_ESTABLISHED,
    payload: {
      data: 'Hello World!',
    },
  };
};

export default connectionEstablished;
