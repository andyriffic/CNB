// @flow
import { safeProp } from '../utils/functional/helpers';
import { GAME_STATUS } from '../state/GameStatuses';
import { Some, None } from '../utils/functional/Option';

import type { Game } from '../types/GameType';
import type { GameStatus } from '../types/GameStatusType';


const calculateGameStatus = (game: Game): GameStatus => {

  const player1MoveOrNone = safeProp('player1', game).flatMap(p=> safeProp('move', p));
  const player2MoveOrNone = safeProp('player2', game).flatMap(p=> safeProp('move', p));

  //todo: if game has runGame
  //return GAME_STATUS.FINISHED;

  if (player1MoveOrNone instanceof Some && player2MoveOrNone instanceof Some) {
    return GAME_STATUS.READY;
  }

  if (player1MoveOrNone instanceof Some && player2MoveOrNone instanceof None) {
    return GAME_STATUS.WAITING_FOR_PLAYER_2;
  }

  if (player1MoveOrNone instanceof None && player2MoveOrNone instanceof Some) {
    return GAME_STATUS.WAITING_FOR_PLAYER_1;
  }

  return GAME_STATUS.EMPTY;
};

export default calculateGameStatus;
