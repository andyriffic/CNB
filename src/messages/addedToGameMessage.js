// @flow
import type { Message } from './MessageType';
import { ADDED_TO_GAME } from './typeConstants';

const addedToGameMessage = (): Message => {
  return {
    type: ADDED_TO_GAME,
    payload: { },
  };
};

export default addedToGameMessage;
