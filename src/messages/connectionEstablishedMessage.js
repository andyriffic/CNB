// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const connectionEstablished = (clientId): Message => {
  return {
    type: outgoingMessageTypes.CONNECTION_ESTABLISHED,
    payload: {
      clientId,
    },
  };
};

export default connectionEstablished;
