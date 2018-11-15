// @flow
import type { Message } from './MessageType';
import type { Game } from '../types/GameType';
import { outgoingMessageTypes } from './typeConstants';

const gameCompleteMessage = (game: Game): Message => {

  let winner;

  if(game.result.winner === 'player1') {
    winner = game.player1.name;
  }
  if(game.result.winner === 'player2') {
    winner = game.player2.name;
  }

  return {
    type: outgoingMessageTypes.GAME_FINISHED,
    payload: {
      winner,
      draw: game.result.draw,
    },
  };
};

export default gameCompleteMessage;
