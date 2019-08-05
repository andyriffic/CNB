import { playerService } from '../services/player';
import { Socket, Server } from 'socket.io';
import { createLogger, LOG_NAMESPACE } from '../../utils/debug';

const SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS';
const ALL_PLAYERS_UPDATE = 'ALL_PLAYERS_UPDATE';

const log = createLogger('players', LOG_NAMESPACE.socket);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    log('someone connected to players', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_PLAYERS, () => {
      log('Received', SUBSCRIBE_TO_ALL_PLAYERS);
      playerService.getPlayersAsync().then(players => {
        socket.emit(ALL_PLAYERS_UPDATE, players);
      });
    });
  });
};

export default init;
