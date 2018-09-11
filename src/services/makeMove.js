// @flow

import type { Game } from '../types/GameType';
import type { Either } from '../utils/functional/Either';
import { left, right } from '../utils/functional/Either';
import invalidMoveMessage from '../messages/invalidMoveMessage';
import { makeMoveAction } from '../state/actions/slotActions';
import type { InvalidMoveResponse, MakeMoveResponse } from './MakeMoveResponsesType';

const validMoves = ['cowboy', 'ninja', 'bear'];

const validMove = (game: Game, player: string, move: string): Either<void, void> => {
  console.log('validMove', game, player, move);

  //TODO: validate game not over
  //TODO: validate player not moved already

  const validSelection = validMoves.some(validMove => validMove === move);

  if (validSelection) {
    return right();
  }

  return left("Invalid selection");
};

export const eitherMakeMoveOrError = (game: Game, player: string, move: string): Either<InvalidMoveResponse, MakeMoveResponse> => {
  return validMove(game, player, move).fold(
    () => left({ message: invalidMoveMessage() }),
    () => right({ makeMoveAction: makeMoveAction(player, move) })
  );
};
