import { Socket, Server } from 'socket.io';
import { THEMES } from '../services/theme';
import { createLogger, LOG_NAMESPACE } from '../../utils/debug';

const THEME_UPDATE = 'THEME_UPDATE';
const REQUEST_THEMES = 'REQUEST_THEMES';

const log = createLogger('theme', LOG_NAMESPACE.socket);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    log('someone connected to themes', socket.id);

    socket.on(REQUEST_THEMES, () => {
      socket.emit(THEME_UPDATE, THEMES);
    });
  });
};

export default init;
