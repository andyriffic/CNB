// @flow
import type { Game } from './types/Game';
import type { NoSlotsMessage } from './types/messages/NoSlotsMessage';
import type { AllocateSlotAction } from './types/actions/AllocateSlotAction';
import type { SlotAllocatedMessage } from './types/messages/SlotAllocatedMessage';
import createStore from './store/createStore';
import reducer from './state/reducer';
import { allocateSlot } from './state/actions/slotActions';
import type { Either } from './utils/functional/Either';
import { left, right } from './utils/functional/Either';
import { prop, compose } from './utils/functional/helpers';
import { option } from './utils/functional/Option';

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
};

const playerName = (player) => compose(
  option,
  prop('name'),
  prop(player)
);

const checkSlot = (game: Game) => (player: string): Either<NoSlotsMessage, AllocateSlotAction> => {
  const hasPlayer = playerName(player)(game);
  return hasPlayer.fold(
    () => right(allocateSlot(player)),
    () => left({ message: `${player} slot taken` }),
  );
};

const createAllocatedSlotMessage = (): SlotAllocatedMessage => {
  return ({ message: 'slot allocated' });
};

const storeDispatch = (store) => (action) => {
  return store.dispatch(action);
};

const dispatch = storeDispatch(store);

const assignSlot = compose(
  sendMessage,
  createAllocatedSlotMessage,
  dispatch,
);

const connectingPlayerName = 'Foo';

const findSlot = checkSlot(store.getState());


findSlot('player1').fold(
  () => findSlot('player2').fold((msg) => sendMessage(msg), (allocateSlot) => assignSlot(allocateSlot(connectingPlayerName))),
  (allocateSlot) => assignSlot(allocateSlot(connectingPlayerName)),
);
