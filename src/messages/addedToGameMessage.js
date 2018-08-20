// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const addedToGameMessage = (slot: string): Message => {
  return {
    type: outgoingMessageTypes.ADDED_TO_GAME,
    payload: {
      slot,
    },
  };
};

export default addedToGameMessage;
