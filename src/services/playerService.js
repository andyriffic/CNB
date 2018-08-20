// @flow
import { compose, prop } from '../utils/functional/helpers';
import type { AllocateSlotAction } from '../types/actions/AllocateSlotAction';
import { option } from '../utils/functional/Option';
import { left, right } from '../utils/functional/Either';
import type { Either } from '../utils/functional/Either';
import { allocateSlotAction, makeMoveAction } from '../state/actions/slotActions';
import type { Option } from '../utils/functional/Option';
import type { Game } from '../types/GameType';
import type { Message } from '../messages/MessageType';
import playerSlotIsTakenMessage from '../messages/slotTakenMessage';
import type { MakeMoveAction } from '../types/actions/MakeMoveAction';
import invalidMoveMessage from '../messages/invalidMoveMessage';


const playerName = (player: string, game: Game): Option<string> => compose(
  option,
  prop('name'),
  prop
)(player, game);

const checkSlot = (game: Game) => (player: string): Either<Message, (playerName: string) => AllocateSlotAction> => {
  const hasPlayer = playerName(player, game);
  return hasPlayer.fold(
    () => right(allocateSlotAction(player)),
    () => left(playerSlotIsTakenMessage()),
  );
};

export const tryConnectPlayer = (game: Game, playerName: string): Either<Message, AllocateSlotAction> => {
  const checkSlotInStore = checkSlot(game);

  return checkSlotInStore('player1')
    .fold(() => checkSlotInStore('player2')
      .fold(
        (msg) => left(msg),
        (allocateSlotAction) => right(allocateSlotAction(playerName))
      ),
    (allocateSlotAction) => right(allocateSlotAction(playerName))
    );
};

const validMove = (game: Game, player: string, move: string): Either<void, void> => {
  //TODO: validate game not over
  //TODO: validate player not moved already
  //TODO: validate is a valid move
  console.log('validMove', game, player, move);
  return right();
};

export const tryMakeMove = (game: Game, player: string, move: string): Either<Message, MakeMoveAction> => {
  return validMove(game, player, move).fold(
    () => left(invalidMoveMessage()),
    () => right(makeMoveAction(player, move))
  );
};
