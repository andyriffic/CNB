// @flow
import type { Message } from './MessageType';
import type { Game } from '../types/GameType';
import { outgoingMessageTypes } from './typeConstants';

const gameCompleteMessage = (game: Game): Message => {
  let payload;

  // TODO: revisit a sensible structure for win and draw

  if (game.result.draw) {
    payload = {
      player1PowerUp: game.player1.powerUp,
      player2PowerUp: game.player2.powerUp,
      draw: true,
    };
  } else {
    if (game.result.winner === 'player1') {
      payload = {
        winner: game.player1.name,
        winnerPowerUp: game.player1.powerUp,
        loser: game.player2.name,
        loserPowerUp: game.player2.powerUp,
      };
    }
    if (game.result.winner === 'player2') {
      payload = {
        winner: game.player2.name,
        winnerPowerUp: game.player2.powerUp,
        loser: game.player1.name,
        loserPowerUp: game.player1.powerUp,
      };
    }
  }

  return {
    type: outgoingMessageTypes.GAME_FINISHED,
    payload,
  };
};

export default gameCompleteMessage;
