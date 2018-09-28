// @flow

import eitherConnectOrFull from './services/connectToGame';
import calculateGameStatus from './services/calculateGameStatus';

import type { Store } from './store/StoreType';
import type { Message } from './messages/MessageType';
import type { SendToClient } from './messages/SendToClientType';
import { incomingMessageTypes } from './messages/typeConstants';
import { prop } from './utils/functional/helpers';
import invalidMessageMessage from './messages/invalidMessageMessage';
import gameResetMessage from './messages/gameResetMessage';
import resetGameAction from './state/actions/resetGameAction';
import type { GameIsFullResponse, ConnectedToGameResponse  } from './services/ConnectToGameResponsesType';
import { eitherMakeMoveOrError } from './services/makeMove';
import type { InvalidMoveResponse, MakeMoveResponse } from './services/MakeMoveResponsesType';

const receiveMessage = (store: Store, msg: Message, sendToClient: SendToClient): void => {
  //console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case incomingMessageTypes.REQUEST_TO_CONNECT: {
      const ifLeft = (gameIsFullResponse: GameIsFullResponse) => sendToClient(gameIsFullResponse.message);
      const isRight = (connectedToGameResponse: ConnectedToGameResponse) => {
        store.dispatch(connectedToGameResponse.allocateSlotAction);
        sendToClient(connectedToGameResponse.message);

        //run calculateGameState
        sendToClient(calculateGameStatus(store.getState()));
      };

      eitherConnectOrFull(store.getState(),
        prop('playerName', msg.payload),
        prop('clientId', msg.payload)
      ).fold(ifLeft,isRight);
    }
      break;

    case incomingMessageTypes.MAKE_MOVE: {
      const ifLeft = (invalidMove: InvalidMoveResponse) => sendToClient(invalidMove.message);
      const ifRight = (makeMoveResponse: MakeMoveResponse) => {
        store.dispatch(makeMoveResponse.makeMoveAction);
        sendToClient(calculateGameStatus(store.getState()));
      };

      eitherMakeMoveOrError(store.getState(),
        prop('slot', msg.payload),
        prop('move', msg.payload)
      ).fold(ifLeft, ifRight);
    }
      break;

    case incomingMessageTypes.RESET_GAME: {
      store.dispatch(resetGameAction());
      sendToClient(gameResetMessage());
      sendToClient(calculateGameStatus(store.getState()));
    }
      break;

    case incomingMessageTypes.SPECTATOR_JOIN: {
      sendToClient(calculateGameStatus(store.getState()));
    }
      break;

    default: {
      sendToClient(invalidMessageMessage());
    }
  }
};

export default receiveMessage;
