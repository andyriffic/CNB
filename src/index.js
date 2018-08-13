// @flow
import createStore from './store/createStore';
import reducer from './state/reducer';

import receiveMessage from './receiveMessage';

import type { Message } from './messages/MessageType';

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

receiveMessage(store, {type: 'CONNECT_PLAYER', payload: { playerName: 'foo' } }, sendMessage);
