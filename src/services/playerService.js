// @flow
import { compose, prop } from '../utils/functional/helpers';
import type { AllocateSlotAction } from '../types/actions/AllocateSlotAction';
import { option } from '../utils/functional/Option';
import { left, right } from '../utils/functional/Either';
import type { Either } from '../utils/functional/Either';
import { allocateSlotAction } from '../state/actions/slotActions';
import type { Option } from '../utils/functional/Option';
import type { Game } from '../types/GameType';
import type { Message } from '../messages/MessageType';
import playerSlotIsTakenMessage from '../messages/slotTakenMessage';


const playerName = (player: string, game: Game): Option<string> => compose(
  option,
  prop('name'),
  prop
)(player, game);

const checkSlot = (game: Game) => (player: string): Either<Message, (playerName: string, clientId: string) => AllocateSlotAction> => {
  const hasPlayer = playerName(player, game);
  return hasPlayer.fold(
    () => right(allocateSlotAction(player)),
    () => left(playerSlotIsTakenMessage()),
  );
};

export const tryConnectPlayer = (game: Game, playerName: string, clientId: string): Either<Message, AllocateSlotAction> => {
  const checkSlotInStore = checkSlot(game);

  return checkSlotInStore('player1')
    .fold(() => checkSlotInStore('player2')
      .fold(
        (msg) => left(msg),
        (allocateSlotAction) => right(allocateSlotAction(playerName, clientId))
      ),
    (allocateSlotAction) => right(allocateSlotAction(playerName, clientId))
    );
};
