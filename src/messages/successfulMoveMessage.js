import type { Message } from './MessageType';
import { SUCCESSFUL_MOVE } from './typeConstants';

const successfulMoveMessage = (): Message => {
  return {
    type: SUCCESSFUL_MOVE,
  }
};

export default successfulMoveMessage;
