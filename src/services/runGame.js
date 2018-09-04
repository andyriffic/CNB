// @flow
import type { GameResult } from './CalculateGameStatusResponseType';
import type { Game } from '../types/GameType';

import { Some } from '../utils/functional/Option';
import { safeProp } from '../utils/functional/helpers';

const runGame = (game: Game): GameResult => {

  const player1MoveOrNone = safeProp('player1', game).flatMap(p=> safeProp('move', p));
  const player2MoveOrNone = safeProp('player2', game).flatMap(p=> safeProp('move', p));


  if (player1MoveOrNone instanceof Some && player2MoveOrNone instanceof Some) {
    return {
      player1Move: player1MoveOrNone.getOrElse('SHOULD NOT GET HERE'),
      player2Move: player2MoveOrNone.getOrElse('SHOULD NOT GET HERE'),
      //TODO work out the real result
      result: 'DRAW',
    };
  }

  return {
    result: 'PENDING',
  };
};

export default runGame;
