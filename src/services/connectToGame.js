// @flow
import { compose, prop } from '../utils/functional/helpers';
import { Some, None } from '../utils/functional/Option';
import { left, right } from '../utils/functional/Either';
import type { Either } from '../utils/functional/Either';
import { allocateSlotAction } from '../state/actions/slotActions';
import type { Option } from '../utils/functional/Option';
import type { Game } from '../types/GameType';
import gameIsFullMessage from '../messages/slotTakenMessage';
import addedToGameMessage from '../messages/addedToGameMessage';
import type { GameIsFullResponse, ConnectedToGameResponse  } from './ConnectToGameResponses';

const checkSlot = (slot: string) => (playerName: string): Option<string> => {
  if (playerName === null || playerName === undefined) {
    return new Some(slot);
  }

  return new None();
};

const canConnectToSlot = (player: string, game: Game): Option<string> => compose(
  checkSlot(player),
  prop('name'),
  prop
)(player, game);


const getSlot = (game: Game): Option<string> => {
  const slot1 = canConnectToSlot('player1', game);

  //TODO: replace with pattern matching
  if (slot1 instanceof Some) return slot1;
  else return canConnectToSlot('player2', game);
};

const eitherConnectOrFull = (game: Game, playerName: string, clientId: string): Either<GameIsFullResponse, ConnectedToGameResponse> => {
  const slotAllocated = getSlot(game);
  const slotName = slotAllocated.getOrElse('oh no :(');

  //TODO: replace with pattern matching
  if (slotAllocated instanceof Some) {

    return right({
      allocateSlotAction: allocateSlotAction(slotName)(playerName, clientId),
      message: addedToGameMessage(slotName),
    });
  }
  else {
    return left({
      message: gameIsFullMessage(),
    });
  }
};

export default eitherConnectOrFull;
