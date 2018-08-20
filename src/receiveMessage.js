// @flow

import { tryConnectPlayer, tryMakeMove } from './services/playerService';
import type { Store } from './store/StoreType';
import type { Message } from './messages/MessageType';
import type { SendToClient } from './messages/SendToClientType';
import { MAKE_MOVE, REQUEST_TO_CONNECT } from './messages/typeConstants';
import gameIsFullMessage from './messages/gameIsFullMessage';
import addedToGameMessage from './messages/addedToGameMessage';
import invalidMoveMessage from './messages/invalidMoveMessage';
import successfulMoveMessage from './messages/successfulMoveMessage';
import { prop } from './utils/functional/helpers';

const receiveMessage = (store: Store, msg: Message, sendToClient: SendToClient): void => {
  console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case REQUEST_TO_CONNECT:
      tryConnectPlayer(store.getState(), prop('playerName', msg.payload)).fold(
        () => sendToClient(gameIsFullMessage()),
        (action) => {
          store.dispatch(action);
          sendToClient(addedToGameMessage());
        },
      );
      break;

    case MAKE_MOVE:
      tryMakeMove(store.getState(), prop('slot', msg.payload), prop('move', msg.payload)).fold(
        () => sendToClient(invalidMoveMessage()),
        (action) => {
          store.dispatch(action);
          sendToClient(successfulMoveMessage());
        }
      );
      break;

    default:
      sendToClient({type: 'UNKOWN', payload: {} });
  }
};

export default receiveMessage;
