// @flow

import { tryConnectPlayer } from './services/playerService';

import type { Store } from './store/StoreType';

import type { Message } from './messages/MessageType';
import type { SendToClient } from './messages/SendToClientType';
import { REQUEST_TO_CONNECT } from './messages/typeConstants';
import gameIsFullMessage from './messages/gameIsFullMessage';
import addedToGameMessage from './messages/addedToGameMessage';

const receiveMessage = (store: Store, msg: Message, sendToClient: SendToClient): void => {
  console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case REQUEST_TO_CONNECT:
      tryConnectPlayer(store.getState(), msg.payload.playerName).fold(
        () => sendToClient(gameIsFullMessage()),
        (action) => {
          store.dispatch(action);
          sendToClient(addedToGameMessage());
        },
      );
      break;

    default:
      sendToClient({type: 'UNKOWN', payload: {} });
  }
};

export default receiveMessage;
