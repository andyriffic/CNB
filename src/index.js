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
*/

const store = createStore(reducer);

export const sendMessage = (msg: Message): void => {
  console.log(msg);
  console.log('------STORE------');
  console.log(store.getState());
  console.log('------STORE------');
};

receiveMessage(store, {type: incomingMessageTypes.REQUEST_TO_CONNECT, payload: { playerName: 'foo' } }, sendMessage);
receiveMessage(store, {type: incomingMessageTypes.MAKE_MOVE, payload: { slot: 'player1', move: 'cowboy' } }, sendMessage);
