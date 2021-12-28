import { Socket, Server } from 'socket.io';
import { customAlphabet } from 'nanoid';

import { createGame, nextPlayer, playCard, press } from '.';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import { Player } from '../../services/player/types';
import { GasGame } from './types';

const REQUEST_GAS_GAMES = 'REQUEST_GAS_GAMES';
const GAS_GAMES_UPDATE = 'GAS_GAMES_UPDATE';
const CREATE_GAS_GAME = 'CREATE_GAS_GAME';
const PLAY_GAS_CARD = 'PLAY_GAS_CARD';
const PRESS_GAS = 'PRESS_GAS';
const NEXT_GAS_PAYER = 'NEXT_GAS_PAYER';

const log = createLogger('gas-out', LOG_NAMESPACE.socket);

function getGameOrThrow(allGames: GasGame[], gameId: string): GasGame {
  const game = allGames.find((g) => g.id === gameId);
  if (!game) {
    throw `Game ${gameId} not found`;
  }

  return game;
}

function updateGames(allGames: GasGame[], game: GasGame): GasGame[] {
  return allGames.map((g) => (g.id === game.id ? game : g));
}

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

    socket.on(
      PLAY_GAS_CARD,
      (gameId: string, playerId: string, cardIndex: number) => {
        log(PLAY_GAS_CARD, gameId, playerId, cardIndex);
        const game = getGameOrThrow(activeGasGames, gameId);

        const updatedGame = playCard(game, playerId, cardIndex);
        activeGasGames = updateGames(activeGasGames, updatedGame);

        log('UPDATED GAME', updatedGame);
        namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
      }
    );

    socket.on(PRESS_GAS, (gameId: string) => {
      log(PRESS_GAS, gameId);
      const game = getGameOrThrow(activeGasGames, gameId);

      const updatedGame = press(game);
      activeGasGames = updateGames(activeGasGames, updatedGame);

      log('UPDATED GAME', updatedGame);
      namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
    });

    socket.on(NEXT_GAS_PAYER, (gameId: string) => {
      log(NEXT_GAS_PAYER, gameId);
      const game = getGameOrThrow(activeGasGames, gameId);

      const updatedGame = nextPlayer(game);
      activeGasGames = updateGames(activeGasGames, updatedGame);

      log('UPDATED GAME', updatedGame);
      namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
    });
  });
};

export default init;
