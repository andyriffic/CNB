import { Socket, Server } from 'socket.io';
import { customAlphabet } from 'nanoid';

import { createGame } from '.';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import { Player } from '../../services/player/types';
import { GasGame } from './types';

const REQUEST_GAS_GAMES = 'REQUEST_GAS_GAMES';
const GAS_GAMES_UPDATE = 'GAS_GAMES_UPDATE';
const CREATE_GAS_GAME = 'CREATE_GAS_GAME';

const log = createLogger('gas-out', LOG_NAMESPACE.socket);

const idGenerator = customAlphabet('BCDFGHJKLMNPQRSTVWXZ', 6);
let activeGasGames: GasGame[] = [];

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    log('someone connected', socket.id);

    socket.on(REQUEST_GAS_GAMES, () => {
      socket.emit(GAS_GAMES_UPDATE, activeGasGames);
    });

    socket.on(
      CREATE_GAS_GAME,
      ({ players }: { players: Player[] }, onCreated: (id: string) => void) => {
        const gasGame = createGame({ id: idGenerator(), players });
        log('Created GasGame', gasGame);
        activeGasGames = [gasGame]; //Only allow one mobGame at a time for now
        namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
        onCreated(gasGame.id);
      }
    );
  });
};

export default init;
