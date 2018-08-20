// @flow

import { tryConnectPlayer, tryMakeMove } from './services/playerService';
import type { Store } from './store/StoreType';
import type { Message } from './messages/MessageType';
import type { SendToClient } from './messages/SendToClientType';
import { incomingMessageTypes } from './messages/typeConstants';
import gameIsFullMessage from './messages/gameIsFullMessage';
import addedToGameMessage from './messages/addedToGameMessage';
import invalidMoveMessage from './messages/invalidMoveMessage';
import successfulMoveMessage from './messages/successfulMoveMessage';
import { prop } from './utils/functional/helpers';
import invalidMessageMessage from './messages/invalidMessageMessage';
import type { AllocateSlotAction } from './types/actions/AllocateSlotAction';

const receiveMessage = (store: Store, msg: Message, sendToClient: SendToClient): void => {
  console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case incomingMessageTypes.REQUEST_TO_CONNECT:
      tryConnectPlayer(store.getState(), prop('playerName', msg.payload)).fold(
        () => sendToClient(gameIsFullMessage()),
        (action: AllocateSlotAction) => {
          store.dispatch(action);
          sendToClient(addedToGameMessage(action.slot));
        },
      );
      break;

    case incomingMessageTypes.MAKE_MOVE:
      tryMakeMove(store.getState(), prop('slot', msg.payload), prop('move', msg.payload)).fold(
        () => sendToClient(invalidMoveMessage()),
        (action) => {
          store.dispatch(action);
          sendToClient(successfulMoveMessage());
        }
      );
      break;

    default:
      sendToClient(invalidMessageMessage());
  }
};

export default receiveMessage;
