// @flow
import createStore from './store/createStore';
import reducer from './state/reducer';

import receiveMessage from './receiveMessage';

import type { Message } from './messages/MessageType';
import { incomingMessageTypes } from './messages/typeConstants';

console.log('Hello cowboy');

/*
  CONNECT (name)
    -> check for slot => [Full error]
      -> Allocate => [Player Connected]

    <- [Ready for moves]

  MAKE MOVE
    -> validate => [Error]
      -> store
    <- Player Selected

  READY TO PLAY
    <- Result

  HANDLE DISCONNECTS
*/

const CONSOLE_RESET = '\x1b[0m';
const CONSOLE_BLUE = '\x1b[34m';
const CONSOLE_YELLOW = '\x1b[33m';
const CONSOLE_GREEN = '\x1b[32m';

const colorLog = (msg, color) => {
  console.log(`${color}${msg}${CONSOLE_RESET}`);
};

const store = createStore(reducer);

export const sendMessage = (msg: Message): void => {
  colorLog('=================', CONSOLE_BLUE);
  colorLog(JSON.stringify(msg), CONSOLE_YELLOW);
  colorLog('------STORE------', CONSOLE_GREEN);
  colorLog(JSON.stringify(store.getState()), CONSOLE_GREEN);
  colorLog('------STORE------', CONSOLE_GREEN);
};

receiveMessage(store, {type: incomingMessageTypes.REQUEST_TO_CONNECT, payload: { playerName: 'foo', clientId: '#123' } }, sendMessage);

receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player1', move: 'ROCK' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player2', move: 'cowboy' } }, sendMessage);
