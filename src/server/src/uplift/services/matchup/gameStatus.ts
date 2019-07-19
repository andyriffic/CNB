import { GAME_STATUS, GameMove, Game } from './types';

const moveComplete = (move: GameMove): Boolean => {
  return !!(move.moveId && move.playerId && move.powerUpId);
}

export const getGameStatus = (game: Game): GAME_STATUS => {

  if (game.result) {
    return GAME_STATUS.Finished;
  }

  if (moveComplete(game.moves[0]) && moveComplete(game.moves[1])) {
    return GAME_STATUS.ReadyToPlay;
  }

  return GAME_STATUS.WaitingPlayerMoves;
};
