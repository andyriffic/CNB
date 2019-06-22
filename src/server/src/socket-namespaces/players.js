import { getAllPlayers } from '../players/players';

const PATH = '/players';
const PLAYERS_UPDATE = 'PLAYERS_UPDATE';

let cachedPlayers;

const init = socketIo => {
  // const gameHistory = {};
  const namespace = socketIo.of(PATH);


  namespace.on('connection', function(socket) {
    console.log('someone connected to players', socket.id);

    if (cachedPlayers) {
      socket.emit(PLAYERS_UPDATE, cachedPlayers);
    } else {
      getAllPlayers().then(players => {
        cachedPlayers = players;
        socket.emit(PLAYERS_UPDATE, cachedPlayers);
      });
    }
  });
};

export default init;
