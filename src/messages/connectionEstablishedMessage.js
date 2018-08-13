// @flow
import type { Message } from './MessageType';
import { CONNECTION_ESTABLISHED } from './typeConstants';

const connectionEstablished = (): Message => {
  return {
    type: CONNECTION_ESTABLISHED,
    payload: {
      data: 'Hello World!',
    },
  };
};

export default connectionEstablished;
