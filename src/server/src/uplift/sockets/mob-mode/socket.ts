import { Socket, Server } from 'socket.io';
import { MobGame, MobGameType, MoveId } from './types';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import {
  createMobGame,
  createMobGameSpectatorView,
  makeMobPlayerMove,
  makeMugPlayerMove,
  markMobGameAsViewed,
  resetForNextRoundMobGame,
  resolveMobGame,
} from '.';
import { Player } from '../../services/player/types';
import { mapMobGameToStats } from '../../services/stats/mobMappers';
import { StatsService } from '../../services/stats';
import { playersDatastore } from '../../datastore/players';
import { pointsToPlayersCastle } from './points-to-player-castle';

const REQUEST_MOB_GAMES = 'REQUEST_MOB_GAMES';
const MOB_GAMES_UPDATE = 'MOB_GAMES_UPDATE';
const CREATE_MOB_GAME = 'CREATE_MOB_GAME';
const MAKE_MOB_MOVE = 'MAKE_MOB_MOVE';
const MAKE_MUG_MOVE = 'MAKE_MUG_MOVE';
const RESOLVE_MOB_GAME = 'RESOLVE_MOB_GAME';
const VIEWED_MOB_GAME_ROUND = 'VIEWED_MOB_GAME_ROUND';
const NEXT_ROUND_MOB_GAME = 'NEXT_ROUND_MOB_GAME';

let activeMobGames: MobGame[] = [];
const log = createLogger('mobs', LOG_NAMESPACE.socket);

type CreateMobParams = {
  mug: Player;
  mob: Player[];
  gameType: MobGameType;
};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    log('someone connected', socket.id);

    socket.on(REQUEST_MOB_GAMES, () => {
      socket.emit(
        MOB_GAMES_UPDATE,
        activeMobGames.map(createMobGameSpectatorView)
      );
    });

    socket.on(
      CREATE_MOB_GAME,
      (
        { mug, mob, gameType }: CreateMobParams,
        onCreated: (id: string) => void
      ) => {
        const mobGame = createMobGame(mug, mob, gameType);
        log('Created MobGame', mobGame);
        activeMobGames = [mobGame]; //Only allow one mobGame at a time for now
        namespace.emit(
          MOB_GAMES_UPDATE,
          activeMobGames.map(createMobGameSpectatorView)
        );
        onCreated(mobGame.id);
      }
    );

    socket.on(
      MAKE_MOB_MOVE,
      (mobGameId: string, playerId: string, moveId: MoveId) => {
        const mobGame = activeMobGames.find((mg) => mg.id === mobGameId);
        if (!mobGame) {
          log('MobGame does not exist', mobGameId);
          return;
        }
        log('Making Mob Move', mobGameId, playerId, moveId);

        const updatedMobGame = makeMobPlayerMove(mobGame, playerId, moveId);
        activeMobGames = [
          ...activeMobGames.filter((mb) => mb.id !== updatedMobGame.id),
          updatedMobGame,
        ];
        namespace.emit(
          MOB_GAMES_UPDATE,
          activeMobGames.map(createMobGameSpectatorView)
        );
      }
    );

    socket.on(MAKE_MUG_MOVE, (mobGameId: string, moveId: MoveId) => {
      const mobGame = activeMobGames.find((mg) => mg.id === mobGameId);
      if (!mobGame) {
        log('MobGame does not exist', mobGameId);
        return;
      }
      log('Making Mug Move', mobGameId, moveId);

      const updatedMobGame = makeMugPlayerMove(mobGame, moveId);
      activeMobGames = [
        ...activeMobGames.filter((mb) => mb.id !== updatedMobGame.id),
        updatedMobGame,
      ];
      namespace.emit(
        MOB_GAMES_UPDATE,
        activeMobGames.map(createMobGameSpectatorView)
      );
    });

    socket.on(RESOLVE_MOB_GAME, (mobGameId: string) => {
      const mobGame = activeMobGames.find((mg) => mg.id === mobGameId);
      if (!mobGame) {
        log('MobGame does not exist', mobGameId);
        return;
      }
      log('Resolving Mob Game', mobGameId);

      const updatedMobGame = resolveMobGame(mobGame, (resolvedGame) => {
        playersDatastore.getAllPlayers().then((allPlayers) => {
          const statsRecords = mapMobGameToStats(resolvedGame, allPlayers);
          statsRecords.forEach((statsRecord) => {
            StatsService.saveMobGameStatsEntry(statsRecord);
          });
          StatsService.publishMobSummaryStats();
        });
      });

      if (createMobGameSpectatorView(updatedMobGame).gameOver) {
        pointsToPlayersCastle(updatedMobGame, log);
      }

      activeMobGames = [
        ...activeMobGames.filter((mb) => mb.id !== updatedMobGame.id),
        updatedMobGame,
      ];
      namespace.emit(
        MOB_GAMES_UPDATE,
        activeMobGames.map(createMobGameSpectatorView)
      );
    });

    socket.on(NEXT_ROUND_MOB_GAME, (mobGameId: string) => {
      const mobGame = activeMobGames.find((mg) => mg.id === mobGameId);
      if (!mobGame) {
        log('MobGame does not exist', mobGameId);
        return;
      }
      log('Mob Game next round', mobGameId);

      const updatedMobGame = resetForNextRoundMobGame(mobGame);
      activeMobGames = [
        ...activeMobGames.filter((mb) => mb.id !== updatedMobGame.id),
        updatedMobGame,
      ];
      namespace.emit(
        MOB_GAMES_UPDATE,
        activeMobGames.map(createMobGameSpectatorView)
      );
    });

    socket.on(VIEWED_MOB_GAME_ROUND, (mobGameId: string) => {
      const mobGame = activeMobGames.find((mg) => mg.id === mobGameId);
      if (!mobGame) {
        log('MobGame does not exist', mobGameId);
        return;
      }
      log('Mob Game viewed', mobGameId);

      const updatedMobGame = markMobGameAsViewed(mobGame);
      activeMobGames = [
        ...activeMobGames.filter((mb) => mb.id !== updatedMobGame.id),
        updatedMobGame,
      ];
      namespace.emit(
        MOB_GAMES_UPDATE,
        activeMobGames.map(createMobGameSpectatorView)
      );
    });
  });
};

export default init;
