// @flow

import type { Game } from '../types/GameType';
import type { Either } from '../utils/functional/Either';
import { left, right } from '../utils/functional/Either';
import invalidMoveMessage from '../messages/invalidMoveMessage';
import { makeMoveAction } from '../state/actions/slotActions';
import type { InvalidMoveResponse, MakeMoveResponse } from './MakeMoveResponsesType';

import { MOVES } from '../state/Moves';

//maybe filter out "UNKOWN"
const validMoves = Object.values(MOVES);

const validMove = (game: Game, player: string, move: string): Either<string, void> => {

  //TODO: validate game not over
  //TODO: validate player not moved already

  const validSelection = validMoves.some(validMove => validMove === move);

  if (validSelection) {
    return right();
  }

  return left('Invalid selection');
};

export const eitherMakeMoveOrError = (game: Game, player: string, move: string, powerUp: string): Either<InvalidMoveResponse, MakeMoveResponse> => {
  return validMove(game, player, move).fold(
    () => left({ message: invalidMoveMessage() }),
    () => right({ makeMoveAction: makeMoveAction(player, move, powerUp) })
  );
};
