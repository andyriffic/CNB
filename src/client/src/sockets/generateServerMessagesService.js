const generateServerMessagesService = socket => {
  return {
    getGameState: () => socket.emit('GET_GAME_VIEW', { type: 'GET_GAME_VIEW' }),
    makeMove: (player, move, powerUp, avatar) =>
      socket.emit('MAKE_MOVE', {
        type: 'MAKE_MOVE',
        payload: { slot: player, move, powerUp, avatar },
      }),
    resetGame: () => socket.emit('RESET_GAME', { type: 'RESET_GAME' }),
    playGame: () => socket.emit('RUN_GAME', { type: 'RUN_GAME' }),
    saveGameStats: (themeName, pointsAwarded, powerUpsAwarded, trophyAwarded) =>
      socket.emit('SAVE_GAME_STATS', {
        type: 'SAVE_GAME_STATS',
        payload: { themeName, pointsAwarded, powerUpsAwarded, trophyAwarded },
      }),
    awardPowerUps: powerUps =>
      socket.emit('AWARDED_POWERUPS', {
        type: 'AWARDED_POWERUPS',
        payload: powerUps,
      }),
  };
};

export default generateServerMessagesService;
