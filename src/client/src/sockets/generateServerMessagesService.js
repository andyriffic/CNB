/* @flow */
import type { ServerMessages } from './ServerMessagesType';

const generateServerMessagesService = (socket: Object): ServerMessages => {
  return {
    getGameState: () => socket.emit('GET_GAME_VIEW', { type: 'GET_GAME_VIEW' }),
    makeMove: (player, move) => socket.emit('MAKE_MOVE', { type: 'MAKE_MOVE', payload: { slot: player, move } }),
    resetGame: () => socket.emit('RESET_GAME', { type: 'RESET_GAME' }),
    playGame: () => socket.emit('RUN_GAME', { type: 'RUN_GAME' }),
  };
}

export default generateServerMessagesService;
