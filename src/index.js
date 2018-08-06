// @flow
import type { Game } from './types/Game';
import type { Either } from './types/functional/Either';
import type { NoSlotsMessage } from './types/messages/NoSlotsMessage';
import type { AllocateSlotAction } from './types/actions/AllocateSlotAction';
import { left, right } from './types/functional/Either';
import type { SlotAllocatedMessage } from './types/messages/SlotAllocatedMessage';
import createStore from './store/createStore';
import reducer from './state/reducer';
import { allocateSlot } from './state/actions/slotActions';

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

const sendMessage = (msg) => {
  console.log('------STORE------');
  console.log(store.getState());
  console.log('------STORE------');
  console.log(msg);
}

const checkSlot = (game: Game) : Either<NoSlotsMessage, AllocateSlotAction> => {
  return true
    ? right(allocateSlot('player1'))
    : left({ message: 'no slot' });
};

const createAllocatedSlotMessage = () : SlotAllocatedMessage => {
  return ({ message: 'slot allocated' })
};

checkSlot({}).fold(
  (a)=> sendMessage(a),
  (b)=> sendMessage(createAllocatedSlotMessage(store.dispatch(b))),
);
