// @flow

import eitherConnectOrFull from './services/connectToGame';
import publishGameView from './services/publishGameView';
import calculateGameStatus from './services/calculateGameStatus';
import runGame from './services/runGame';

import type { Store } from './store/StoreType';
import type { Message } from './messages/MessageType';
import type { SendToClient } from './messages/SendToClientType';
import { incomingMessageTypes } from './messages/typeConstants';
import { prop } from './utils/functional/helpers';
import invalidMessageMessage from './messages/invalidMessageMessage';
import gameResetMessage from './messages/gameResetMessage';
import gameCompleteMessage from './messages/gameCompleteMessage';
import resetGameAction from './state/actions/resetGameAction';
import updateGameStatusAction from './state/actions/updateGameStatusAction';
import updateGameResultAction from './state/actions/updateGameResultAction';
import { GAME_STATUS } from './state/GameStatuses';

import type { GameIsFullResponse, ConnectedToGameResponse  } from './services/ConnectToGameResponsesType';
import { eitherMakeMoveOrError } from './services/makeMove';
import type { InvalidMoveResponse, MakeMoveResponse } from './services/MakeMoveResponsesType';
import awardedPowerUpsMessage from './messages/awardedPowerUpsMessage';
import { addStatsEntry, mapGameStateToStats } from './stats';

const receiveMessage = (store: Store, msg: Message, sendToClient: SendToClient): void => {
  //console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case incomingMessageTypes.REQUEST_TO_CONNECT: {
      const ifLeft = (gameIsFullResponse: GameIsFullResponse) => sendToClient(gameIsFullResponse.message);
      const isRight = (connectedToGameResponse: ConnectedToGameResponse) => {
        store.dispatch(connectedToGameResponse.allocateSlotAction);
        sendToClient(connectedToGameResponse.message);

        sendToClient(publishGameView(store.getState()));
      };

      eitherConnectOrFull(store.getState(),
        prop('playerName', msg.payload),
        prop('clientId', msg.payload)
      ).fold(ifLeft,isRight);
    }
      break;

    case incomingMessageTypes.MAKE_MOVE: {

      //TODO: dont make move if the game has already been run

      const ifLeft = (invalidMove: InvalidMoveResponse) => sendToClient(invalidMove.message);
      const ifRight = (makeMoveResponse: MakeMoveResponse) => {
        store.dispatch(makeMoveResponse.makeMoveAction);
        store.dispatch(updateGameStatusAction(calculateGameStatus(store.getState())));

        sendToClient(publishGameView(store.getState()));
      };

      eitherMakeMoveOrError(store.getState(),
        prop('slot', msg.payload),
        prop('move', msg.payload),
        prop('powerUp', msg.payload),
        prop('avatar', msg.payload)
      ).fold(ifLeft, ifRight);
    }
      break;

    case incomingMessageTypes.RESET_GAME: {
      store.dispatch(resetGameAction());
      sendToClient(gameResetMessage());

      sendToClient(publishGameView(store.getState()));
    }
      break;


    case incomingMessageTypes.RUN_GAME: {
      const gameResult = runGame(store.getState());
      store.dispatch(updateGameResultAction(gameResult));
      store.dispatch(updateGameStatusAction(GAME_STATUS.FINISHED));
      addStatsEntry(mapGameStateToStats(store.getState(), prop('themeName', msg.payload)));
      sendToClient(gameCompleteMessage(store.getState()));
      sendToClient(publishGameView(store.getState()));
    }
      break;

    case incomingMessageTypes.GET_GAME_VIEW:
    case incomingMessageTypes.SPECTATOR_JOIN: {

      sendToClient(publishGameView(store.getState()));
    }
      break;

    case incomingMessageTypes.AWARDED_POWERUPS: {
      sendToClient(awardedPowerUpsMessage(msg.payload));
    }
      break;

    default: {
      sendToClient(invalidMessageMessage());
    }
  }
};

export default receiveMessage;
