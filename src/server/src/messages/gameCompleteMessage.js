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
        winnerKey: 'player1',
        winner: game.player1.name, // Eventually remove this
        winnerPowerUp: game.player1.powerUp,
        loserKey: 'player2',
        loser: game.player2.name, // Eventually remove this
        loserPowerUp: game.player2.powerUp,
      };
    }
    if (game.result.winner === 'player2') {
      payload = {
        winnerKey: 'player2',
        winner: game.player2.name, // Eventually remove this
        winnerPowerUp: game.player2.powerUp,
        loserKey: 'player1',
        loser: game.player1.name, // Eventually remove this
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
