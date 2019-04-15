const PATH = '/lobby';
const EVENT_GAME_LIST_UPDATE = 'GAME_LIST_UPDATE';

const init = (socketIo) => {
  let availableGames = [];

  const namespace = socketIo.of(PATH);
  namespace.on('connection', function(socket) {
    console.log('====== CONNECTED TO LOBBY =======', PATH, socket.id);
    socket.emit(EVENT_GAME_LIST_UPDATE, availableGames);
  });

  return {
    gameAvailable: gameId => {
      console.log('====== GAME AVAILABLE =======', PATH);
      availableGames = [...availableGames, gameId];
      socketIo.of(PATH).emit(EVENT_GAME_LIST_UPDATE, availableGames);
    },
  };
};

export default init;
