// @flow
import createStore from './store/createStore';
import reducer from './state/reducer';
import { tryConnectPlayer } from './services/playerService';

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

export const sendMessage = (msg) => {
  console.log(msg);
  console.log('------STORE------');
  console.log(store.getState());
  console.log('------STORE------');
};

export const receiveMessage = (msg) => {
  console.log('RECEIVE MESSAGE', msg);

  switch (msg.type) {
    case 'CONNECT_PLAYER':
      tryConnectPlayer(store.getState(), msg.playerName).fold(
        (err) => sendMessage(err),
        (action) => {
          store.dispatch(action);
          sendMessage({ message: 'slot allocated' });
        },
      );
      break;

    default:
      sendMessage({message: 'unknown message type'});
  }
};

receiveMessage({type: 'CONNECT_PLAYER', playerName: 'foo'});
