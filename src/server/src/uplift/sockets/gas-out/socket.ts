import { Socket, Server } from 'socket.io';
import { customAlphabet } from 'nanoid';

import {
  createGame,
  makeNextPlayerOutGuess,
  moveToNextAlivePlayer,
  playCard,
  press,
  resetCloud,
  playerTimedOut,
  playEffect,
  moveToNextAlivePlayerWithReverseDeath,
} from '.';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import { Player } from '../../services/player/types';
import { GasGame, GlobalEffect } from './types';
import { pointsToPlayersCastle } from './points-to-player-castle';

const REQUEST_GAS_GAMES = 'REQUEST_GAS_GAMES';
const GAS_GAMES_UPDATE = 'GAS_GAMES_UPDATE';
const CREATE_GAS_GAME = 'CREATE_GAS_GAME';
const PLAY_GAS_CARD = 'PLAY_GAS_CARD';
const PRESS_GAS = 'PRESS_GAS';
const NEXT_GAS_PAYER = 'NEXT_GAS_PAYER';
const GUESS_NEXT_PLAYER_OUT = 'GUESS_NEXT_PLAYER_OUT';
const PLAYER_TIMED_OUT = 'PLAYER_TIMED_OUT';
const PLAY_EFFECT = 'PLAY_EFFECT';

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

        // log('UPDATED GAME', updatedGame);
        namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
      }
    );

    socket.on(PRESS_GAS, (gameId: string) => {
      log(PRESS_GAS, gameId);
      const game = getGameOrThrow(activeGasGames, gameId);

      const updatedGame = press(game);
      activeGasGames = updateGames(activeGasGames, updatedGame);

      // log('UPDATED GAME', updatedGame);
      namespace.emit(GAS_GAMES_UPDATE, activeGasGames);

      if (!!updatedGame.winningPlayerId) {
        pointsToPlayersCastle(updatedGame, log);
      }
    });

    socket.on(NEXT_GAS_PAYER, (gameId: string) => {
      log(NEXT_GAS_PAYER, gameId);
      const game = getGameOrThrow(activeGasGames, gameId);

      const updatedGame = moveToNextAlivePlayerWithReverseDeath(
        resetCloud(game)
      );
      activeGasGames = updateGames(activeGasGames, updatedGame);

      // log('UPDATED GAME', updatedGame);
      namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
    });

    socket.on(PLAY_EFFECT, (gameId: string, globalEffect: GlobalEffect) => {
      log(PLAY_EFFECT, gameId, globalEffect);
      const game = getGameOrThrow(activeGasGames, gameId);

      const updatedGame = playEffect(game, globalEffect);
      activeGasGames = updateGames(activeGasGames, updatedGame);

      // log('UPDATED GAME', updatedGame);
      namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
    });

    socket.on(
      GUESS_NEXT_PLAYER_OUT,
      (gameId: string, playerId: string, guessPlayerId: string) => {
        log(GUESS_NEXT_PLAYER_OUT, gameId);
        const game = getGameOrThrow(activeGasGames, gameId);

        const updatedGame = makeNextPlayerOutGuess(
          game,
          playerId,
          guessPlayerId
        );
        activeGasGames = updateGames(activeGasGames, updatedGame);

        // log('UPDATED GAME', updatedGame);
        namespace.emit(GAS_GAMES_UPDATE, activeGasGames);
      }
    );

    socket.on(PLAYER_TIMED_OUT, (gameId: string, playerId: string) => {
      log(PLAYER_TIMED_OUT, gameId, playerId);
      const game = getGameOrThrow(activeGasGames, gameId);

      const updatedGame = playerTimedOut(game, playerId);
      activeGasGames = updateGames(activeGasGames, updatedGame);

      // log('UPDATED GAME', updatedGame);
      namespace.emit(GAS_GAMES_UPDATE, activeGasGames);

      if (!!updatedGame.winningPlayerId) {
        pointsToPlayersCastle(updatedGame, log);
      }
    });
  });
};

export default init;
