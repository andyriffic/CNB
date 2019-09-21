import { GameResultInput, GameResult, GAME_MOVE } from './types';

const gameOutcomes = {
  [GAME_MOVE.A]: { beats: [GAME_MOVE.B, GAME_MOVE.D] },
  [GAME_MOVE.B]: { beats: [GAME_MOVE.C, GAME_MOVE.E] },
  [GAME_MOVE.C]: { beats: [GAME_MOVE.D, GAME_MOVE.A] },
  [GAME_MOVE.D]: { beats: [GAME_MOVE.B, GAME_MOVE.E] },
  [GAME_MOVE.E]: { beats: [GAME_MOVE.A, GAME_MOVE.C] },
};

const getWinner = (inputs: GameResultInput): GameResult => {
  const [player1Move, player2Move] = inputs;

  if (player1Move === player2Move) {
    return { draw: true };
  }

  const player1MoveOutcome = gameOutcomes[player1Move];
  if (player1MoveOutcome.beats.includes(player2Move)) {
    return { winnerIndex: 0 };
  }

  return { winnerIndex: 1 };
};

export const gameResultService = {
  getWinner,
};
