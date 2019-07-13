import playersCRUD from '../services/player/playerCRUD';
import { PlayerList } from '../services/player/types';
import { Socket, Server } from 'socket.io'

const PLAYERS_UPDATE = 'PLAYERS_UPDATE';

let cachedPlayers: PlayerList;

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to players', socket.id);

    if (cachedPlayers) {
      socket.emit(PLAYERS_UPDATE, cachedPlayers);
    } else {
      playersCRUD.getPlayersAsync().then(players => {
        cachedPlayers = players;
        socket.emit(PLAYERS_UPDATE, cachedPlayers);
      });
    }
  });
};

export default init;
