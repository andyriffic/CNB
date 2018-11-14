// @flow
import type { GameResult } from '../types/GameResultType';
import type { Game } from '../types/GameType';
import type { Move } from '../types/MoveType';

import { MOVES } from '../state/Moves';
import { Some } from '../utils/functional/Option';
import { safeProp } from '../utils/functional/helpers';

export const OUTCOMES = {
  DRAW: 'Draw',
  PLAYER_ONE: 'player1',
  PLAYER_TWO: 'player2',
};

const determineWinner = (player1Move: Move, player2Move: Move): ?GameResult => {
  if(player1Move === player2Move) {
    return { draw: true };
  }

  if(player1Move === MOVES.NINJA && player2Move === MOVES.COWBOY) return { draw: false, winner: OUTCOMES.PLAYER_ONE };
  if(player1Move === MOVES.COWBOY && player2Move === MOVES.BEAR) return { draw: false, winner: OUTCOMES.PLAYER_ONE };
  if(player1Move === MOVES.BEAR && player2Move === MOVES.NINJA) return { draw: false, winner: OUTCOMES.PLAYER_ONE };

  if(player2Move === MOVES.NINJA && player1Move === MOVES.COWBOY) return { draw: false, winner: OUTCOMES.PLAYER_TWO };
  if(player2Move === MOVES.COWBOY && player1Move === MOVES.BEAR) return { draw: false, winner: OUTCOMES.PLAYER_TWO };
  if(player2Move === MOVES.BEAR && player1Move === MOVES.NINJA) return { draw: false, winner: OUTCOMES.PLAYER_TWO };

  // BOOM! :(
  return null;
};

const runGame = (game: Game): ?GameResult => {

  const player1MoveOrNone = safeProp('player1', game).flatMap(p=> safeProp('move', p));
  const player2MoveOrNone = safeProp('player2', game).flatMap(p=> safeProp('move', p));


  if (player1MoveOrNone instanceof Some && player2MoveOrNone instanceof Some) {
    const player1Move = player1MoveOrNone.getOrElse(('unknown': Move));
    const player2Move = player2MoveOrNone.getOrElse(('unknown': Move));

    return determineWinner(player1Move, player2Move);
  }

  // BOOM! :(
  return null;
};

export default runGame;
