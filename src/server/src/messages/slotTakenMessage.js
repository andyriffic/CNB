// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const playerSlotIsTakenMessage = (): Message => {
  return {
    type: outgoingMessageTypes.PLAYER_SLOT_IS_FULL,
  };
};

export default playerSlotIsTakenMessage;
