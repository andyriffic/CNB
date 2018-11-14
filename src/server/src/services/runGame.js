// @flow
import type { GameResult, GameOutcome } from './PublishGameViewResponseType';
import type { Game } from '../types/GameType';
import type { Move } from '../types/MoveType';

import { MOVES } from '../state/Moves';
import { Some } from '../utils/functional/Option';
import { safeProp } from '../utils/functional/helpers';

export const OUTCOMES = {
  PENDING: 'Pending',
  DRAW: 'Draw',
  PLAYER_ONE: 'Player1',
  PLAYER_TWO: 'Player2',
};

const determineWinner = (player1Move: Move, player2Move: Move): GameOutcome => {
  if(player1Move === player2Move) {
    return OUTCOMES.DRAW;
  }

  if(player1Move === MOVES.NINJA && player2Move === MOVES.COWBOY) return OUTCOMES.PLAYER_ONE;
  if(player1Move === MOVES.COWBOY && player2Move === MOVES.BEAR) return OUTCOMES.PLAYER_ONE;
  if(player1Move === MOVES.BEAR && player2Move === MOVES.NINJA) return OUTCOMES.PLAYER_ONE;

  if(player2Move === MOVES.NINJA && player1Move === MOVES.COWBOY) return OUTCOMES.PLAYER_TWO;
  if(player2Move === MOVES.COWBOY && player1Move === MOVES.BEAR) return OUTCOMES.PLAYER_TWO;
  if(player2Move === MOVES.BEAR && player1Move === MOVES.NINJA) return OUTCOMES.PLAYER_TWO;

  // :(
  return OUTCOMES.PENDING;
};

const runGame = (game: Game): GameResult => {

  const player1MoveOrNone = safeProp('player1', game).flatMap(p=> safeProp('move', p));
  const player2MoveOrNone = safeProp('player2', game).flatMap(p=> safeProp('move', p));


  if (player1MoveOrNone instanceof Some && player2MoveOrNone instanceof Some) {
    const player1Move = player1MoveOrNone.getOrElse(('unknown': Move));
    const player2Move = player2MoveOrNone.getOrElse(('unknown': Move));

    return {
      player1Move,
      player2Move,
      outcome: determineWinner(player1Move, player2Move),
    };
  }

  return {
    outcome: OUTCOMES.PENDING,
  };
};

export default runGame;
