import { playerService } from '../services/player';
import { PlayerList } from '../services/player/types';
import { Socket, Server } from 'socket.io';

const TEAMS_UPDATE = 'TEAMS_UPDATE';
const REQUEST_TEAMS = 'REQUEST_TEAMS';

let cachedPlayers: PlayerList;

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to players', socket.id);

    socket.on(REQUEST_TEAMS, () => {
      if (cachedPlayers) {
        socket.emit(TEAMS_UPDATE, cachedPlayers);
      } else {
        playerService.getPlayersAsync().then(players => {
          cachedPlayers = players;
          socket.emit(TEAMS_UPDATE, cachedPlayers);
        });
      }
    });
  });
};

export default init;
