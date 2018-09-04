// @flow

import {
  //tryConnectPlayer,
  tryMakeMove,
} from './services/playerService';

import tryConnectPlayer from './services/connectToGame';

import type { Store } from './store/StoreType';
import type { Message } from './messages/MessageType';
import type { SendToClient } from './messages/SendToClientType';
import { incomingMessageTypes } from './messages/typeConstants';
import invalidMoveMessage from './messages/invalidMoveMessage';
import successfulMoveMessage from './messages/successfulMoveMessage';
import { prop } from './utils/functional/helpers';
import invalidMessageMessage from './messages/invalidMessageMessage';
import type { GameIsFullResponse, ConnectedToGameResponse  } from './services/ConnectToGameResponses';
import gameStatusMessage from './messages/gameStatusMessage';

const receiveMessage = (store: Store, msg: Message, sendToClient: SendToClient): void => {
  console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case incomingMessageTypes.REQUEST_TO_CONNECT:
      tryConnectPlayer(store.getState(), prop('playerName', msg.payload), prop('clientId', msg.payload)).fold(
        (gameIsFullResponse: GameIsFullResponse) => sendToClient(gameIsFullResponse.message),
        (connectedToGameResponse: ConnectedToGameResponse) => {
          store.dispatch(connectedToGameResponse.allocateSlotAction);
          sendToClient(connectedToGameResponse.message);

          sendToClient(gameStatusMessage(store.getState()));
        },
      );
      break;

    case incomingMessageTypes.MAKE_MOVE:
      tryMakeMove(store.getState(), prop('slot', msg.payload), prop('move', msg.payload)).fold(
        () => sendToClient(invalidMoveMessage()),
        (action) => {
          store.dispatch(action);
          sendToClient(successfulMoveMessage());
          sendToClient(gameStatusMessage(store.getState()));
        }
      );
      break;

    default:
      sendToClient(invalidMessageMessage());
  }
};

export default receiveMessage;
