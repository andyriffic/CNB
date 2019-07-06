// @flow
import createStore from './store/createStore';
import reducer from './state/reducer';

import receiveMessage from './receiveMessage';

import type { Message } from './messages/MessageType';
import { incomingMessageTypes } from './messages/typeConstants';
import { testTsFunc } from './uplift/typescript';

console.log('Hello GAME');
console.log('TEST TS:', testTsFunc(false));

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
//const CONSOLE_GREEN = '\x1b[32m';
const CONSOLE_CYAN = '\x1b[36m';

const colorLog = (msg, color) => {
  console.log(`${color}${msg}${CONSOLE_RESET}`);
};

// const printStore = () => {
//   colorLog('------STORE------', CONSOLE_GREEN);
//   colorLog(JSON.stringify(store.getState()), CONSOLE_GREEN);
//   colorLog('------STORE------', CONSOLE_GREEN);
// }

const store = createStore(reducer);

export const sendMessage = (msg: Message): void => {
  colorLog('=================', CONSOLE_BLUE);
  colorLog(JSON.stringify(msg, null, 2), CONSOLE_YELLOW);
  //printStore();
};

//printStore();

colorLog('------------SCENARIO 1----------', CONSOLE_CYAN);
receiveMessage(store, {type: incomingMessageTypes.GET_GAME_VIEW }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player1', move: 'A' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player2', move: 'B' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.RUN_GAME }, sendMessage);
colorLog('------------SCENARIO 1----------', CONSOLE_CYAN);

receiveMessage(store, {type: incomingMessageTypes.RESET_GAME }, sendMessage);

colorLog('------------SCENARIO 2----------', CONSOLE_CYAN);
receiveMessage(store, {type: incomingMessageTypes.GET_GAME_VIEW }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player1', move: 'B' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player2', move: 'A' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.RUN_GAME }, sendMessage);
colorLog('------------SCENARIO 2----------', CONSOLE_CYAN);

receiveMessage(store, {type: incomingMessageTypes.RESET_GAME }, sendMessage);

colorLog('------------SCENARIO 3----------', CONSOLE_CYAN);
receiveMessage(store, {type: incomingMessageTypes.GET_GAME_VIEW }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player1', move: 'C' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player2', move: 'C' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.RUN_GAME }, sendMessage);
colorLog('------------SCENARIO 3----------', CONSOLE_CYAN);
