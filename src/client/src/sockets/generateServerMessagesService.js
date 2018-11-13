/* @flow */
import type { ServerMessages } from './ServerMessagesType';

const generateServerMessagesService = (socket: Object): ServerMessages => {
  return {
    getGameStatus: () => socket.emit('SPECTATOR_JOIN', { type: 'SPECTATOR_JOIN' }),
    makeMove: (player, move) => null,
    resetGame: () => socket.emit('RESET_GAME', { type: 'RESET_GAME' }),
  };
}

export default generateServerMessagesService;
