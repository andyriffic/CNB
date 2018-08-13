// @flow

import { tryConnectPlayer } from './services/playerService';

import type { MessageType } from './messages/MessageType';
import { REQUEST_TO_CONNECT } from './messages/typeConstants';
import gameIsFullMessage from './messages/gameIsFullMessage';
import addedToGameMessage from './messages/addedToGameMessage';

const receiveMessage = (store, msg: MessageType, sendToClient) => {
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
      sendToClient({message: 'unknown message type'});
  }
};

export default receiveMessage;
