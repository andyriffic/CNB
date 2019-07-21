import { playerService } from '../services/player';
import { Socket, Server } from 'socket.io';

const SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS';
const ALL_PLAYERS_UPDATE = 'ALL_PLAYERS_UPDATE';

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to players', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_PLAYERS, () => {
      console.log('Received', SUBSCRIBE_TO_ALL_PLAYERS);
      playerService.getPlayersAsync().then(players => {
        socket.emit(ALL_PLAYERS_UPDATE, players);
      });
    });
  });
};

export default init;
