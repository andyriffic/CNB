import { playerService } from '../../services/player';
import { Socket, Server } from 'socket.io';
import { MobGame } from './types';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import { createMobGame } from '.';
import { Player } from '../../services/player/types';

const REQUEST_MOB_GAMES = 'REQUEST_MOB_GAMES';
const MOB_GAMES_UPDATE = 'MOB_GAMES_UPDATE';
const CREATE_MOB_GAME = 'CREATE_MOB_GAME';
const MAKE_MOB_MOVE = 'MAKE_MOB_MOVE';
const MAKE_MUG_MOVE = 'MAKE_MUG_MOVE';
const RESOLVE_MOB_GAME = 'RESOLVE_MOB_GAME';

let activeMobGames: MobGame[] = [];
const log = createLogger('mobs', LOG_NAMESPACE.socket);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    log('someone connected', socket.id);

    socket.on(REQUEST_MOB_GAMES, () => {
      socket.emit(MOB_GAMES_UPDATE, activeMobGames);
    });

    socket.on(
      CREATE_MOB_GAME,
      (mug: Player, mob: Player[], onCreated: (id: string) => void) => {
        const mobGame = createMobGame(mug, mob);
        log('Created MobGame', mobGame);
        activeMobGames = [...activeMobGames, mobGame];
        namespace.emit(MOB_GAMES_UPDATE, activeMobGames);
        onCreated(mobGame.id);
      }
    );
  });
};

export default init;
