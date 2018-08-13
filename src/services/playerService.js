// @flow
import { compose, prop } from '../utils/functional/helpers';
import type { AllocateSlotAction } from '../types/actions/AllocateSlotAction';
import { option } from '../utils/functional/Option';
import { left, right } from '../utils/functional/Either';
import type { Either } from '../utils/functional/Either';
import type { NoSlotsMessage } from '../types/messages/NoSlotsMessage';
import { allocateSlotAction } from '../state/actions/slotActions';
import type { Game } from '../types/GameType';
import type { Option } from '../utils/functional/Option';

const playerName: Option = compose(
  option,
  prop('name'),
  prop
);

const checkSlot = (game: Game) => (player: string): Either<NoSlotsMessage, AllocateSlotAction> => {
  const hasPlayer = playerName(player, game);
  return hasPlayer.fold(
    () => right(allocateSlotAction(player)),
    () => left({ message: `${player} slot taken` }),
  );
};

export const tryConnectPlayer = (store, playerName) => {
  const checkSlotInStore = checkSlot(store);
  return checkSlotInStore('player1').fold(
    () => checkSlotInStore('player2').fold((msg) => left(msg), (allocateSlot) => right(allocateSlot(playerName))),
    (allocateSlot) => right(allocateSlot(playerName)),
  );
};
