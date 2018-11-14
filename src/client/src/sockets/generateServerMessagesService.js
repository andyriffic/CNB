/* @flow */
import type { ServerMessages } from './ServerMessagesType';

const generateServerMessagesService = (socket: Object): ServerMessages => {
  return {
    getGameState: () => socket.emit('GET_GAME_VIEW', { type: 'GET_GAME_VIEW' }),
    makeMove: (player, move) => null,
    resetGame: () => socket.emit('RESET_GAME', { type: 'RESET_GAME' }),
  };
}

export default generateServerMessagesService;
