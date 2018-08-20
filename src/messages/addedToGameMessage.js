// @flow
import type { Message } from './MessageType';
import { ADDED_TO_GAME } from './typeConstants';

const addedToGameMessage = (slot: string): Message => {
  return {
    type: ADDED_TO_GAME,
    payload: {
      slot,
    },
  };
};

export default addedToGameMessage;
