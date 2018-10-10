// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const connectionEstablished = (clientId: string): Message => {
  return {
    type: outgoingMessageTypes.CONNECTION_ESTABLISHED,
    payload: {
      clientId,
    },
  };
};

export default connectionEstablished;
