import { playerService } from '../services/player';
import { PlayerList } from '../services/player/types';
import { Socket, Server } from 'socket.io';

const REQUEST_TEAMS = 'REQUEST_TEAMS';
const TEAMS_UPDATE = 'TEAMS_UPDATE';

let cachedPlayers: PlayerList;

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    console.log('someone connected to players', socket.id);

    socket.on(REQUEST_TEAMS, () => {
      socket.emit(TEAMS_UPDATE, playerService.getTeamsWithPlayers());
    });
  });
};

export default init;
