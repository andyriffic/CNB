// @flow
import type { Message } from './MessageType';
import { PLAYER_SLOT_IS_FULL } from './typeConstants';

const playerSlotIsTakenMessage = (): Message => {
  return {
    type: PLAYER_SLOT_IS_FULL,
  };
};

export default playerSlotIsTakenMessage;
