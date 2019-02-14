// @flow
import type { Message } from './MessageType';
import type { Game } from '../types/GameType';
import { outgoingMessageTypes } from './typeConstants';

const gameCompleteMessage = (game: Game): Message => {

  let winner, loser, winnerPowerUp;

  if(game.result.winner === 'player1') {
    winner = game.player1.name;
    winnerPowerUp = game.player1.powerUp;
    loser = game.player2.name;
  }
  if(game.result.winner === 'player2') {
    winner = game.player2.name;
    winnerPowerUp = game.player2.powerUp;
    loser = game.player1.name;
  }

  return {
    type: outgoingMessageTypes.GAME_FINISHED,
    payload: {
      winner,
      loser,
      winnerPowerUp,
      draw: game.result.draw,
    },
  };
};

export default gameCompleteMessage;
