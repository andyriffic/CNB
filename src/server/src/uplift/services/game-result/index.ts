import { GameResultInput, GameResult, GAME_MOVE } from './types';

const getWinner = (inputs: GameResultInput): GameResult => {
  const [player1Move, player2Move] = inputs;

  if (player1Move === player2Move) {
    return { draw: true };
  }

  if (player1Move === GAME_MOVE.A && player2Move === GAME_MOVE.B)
    return { winnerIndex: 0 };
  if (player1Move === GAME_MOVE.B && player2Move === GAME_MOVE.C)
    return { winnerIndex: 0 };
  if (player1Move === GAME_MOVE.C && player2Move === GAME_MOVE.A)
    return { winnerIndex: 0 };

  if (player2Move === GAME_MOVE.A && player1Move === GAME_MOVE.B)
    return { winnerIndex: 1 };
  if (player2Move === GAME_MOVE.B && player1Move === GAME_MOVE.C)
    return { winnerIndex: 1 };
  if (player2Move === GAME_MOVE.C && player1Move === GAME_MOVE.A)
    return { winnerIndex: 1 };

  // BOOM! :(
  throw new Error(
    `Cannot resolve game for moves [${player1Move},${player2Move}]`
  );
};

export const gameResult = {
  getWinner,
};
