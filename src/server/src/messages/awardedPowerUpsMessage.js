// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';

const awardedPowerUpsMessage = (awardedPowerUps): Message => {
  return {
    type: outgoingMessageTypes.AWARDED_POWERUPS,
    payload: { ...awardedPowerUps },
    recipients: {
      all: true,
    },
  };
};

export default awardedPowerUpsMessage;
