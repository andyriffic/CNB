import { Socket, Server } from 'socket.io';
import { matchupService } from '../services/matchup';
import shortid from 'shortid';
import random from 'random';
import { matchupDatastore } from '../datastore/matchup';
import { counterService } from '../services/counter';
import { counterDatastore } from '../datastore/counters';
import { TeamMatchup } from '../services/matchup/types';
import { Counter } from '../services/counter/types';
import { publishAllStats } from '../../stats/publishStats';
import { createLogger, LOG_NAMESPACE } from '../../utils/debug';
import { playerService } from '../services/player';
import { getRandomPowerup } from '../services/matchup/powerups';
import { incrementIntegerTag } from '../utils/tags';

const MATCHUPS_UPDATE = 'MATCHUPS_UPDATE';
const ADD_MATCHUP = 'ADD_MATCHUP';
const ADD_INSTANT_MATCHUP = 'ADD_INSTANT_MATCHUP';
const TRIGGER_STATS_PUBLISH = 'TRIGGER_STATS_PUBLISH';
const ASSIGN_RANDOM_POWERUPS = 'ASSIGN_RANDOM_POWERUPS';
const ASSIGN_RANDOM_SNAKES_LADDERS_MOVES = 'ASSIGN_RANDOM_SNAKES_LADDERS_MOVES';

const log = createLogger('matchup-admin', LOG_NAMESPACE.socket);

let cachedMatchups: TeamMatchup[] | null = null;

const resyncMatchups = (socket: Socket) => {
  matchupDatastore
    .getAllMatchups()
    .then((matchups) => {
      cachedMatchups = matchups;
      socket.emit(MATCHUPS_UPDATE, cachedMatchups);
    })
    .catch((error) => {
      console.log('Matchups error', error);
      return error;
    });
};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    log('someone connected to OLD MATCHUPS', socket.id);

    socket.on(
      ADD_INSTANT_MATCHUP,
      (playerIds: [string, string], trophyGoal: number, themeId: string) => {
        const playerPointCounters: [Counter, Counter] = [
          counterService.createCounter(`instant-${shortid.generate()}`),
          counterService.createCounter(`instant-${shortid.generate()}`),
        ];

        const trophyCounters: [Counter, Counter] = [
          counterService.createCounter(`instant-${shortid.generate()}`),
          counterService.createCounter(`instant-${shortid.generate()}`),
        ];

        const bonusCounter = counterService.createCounter(
          `instant-${shortid.generate()}`
        );

        const instantTeamIds: [string, string] = [
          `instant-team-${playerIds[0]}-${shortid.generate()}`,
          `instant-team-${playerIds[1]}-${shortid.generate()}`,
        ];

        playerIds.forEach((playerId, index) => {
          playerService.addInstantTeam({
            id: instantTeamIds[index],
            name: playerId,
            tags: ['instant'],
          });
          playerService.addPlayersToInstantTeam(
            [playerId],
            instantTeamIds[index]
          );
        });

        log('TEAMS ARE NOW', playerService.getAllTeams());
        log('PLAYER IDS BY TEAM ARE NOW', playerService.getPlayerIdsByTeam());

        const matchup = matchupService.createTeamMatchup(
          `instant-${shortid.generate()}`,
          instantTeamIds,
          [playerPointCounters[0].id, playerPointCounters[1].id],
          [trophyCounters[0].id, trophyCounters[1].id],
          bonusCounter.id,
          trophyGoal,
          themeId
        );

        log('CREATING INSTANT MATCHUP', matchup);
        Promise.all([
          counterDatastore.saveNewCounter(playerPointCounters[0]),
          counterDatastore.saveNewCounter(playerPointCounters[1]),
          counterDatastore.saveNewCounter(trophyCounters[0]),
          counterDatastore.saveNewCounter(trophyCounters[1]),
          counterDatastore.saveNewCounter(bonusCounter),
        ]).then(() => {
          matchupDatastore.saveNewMatchup(matchup).then(() => {
            resyncMatchups(socket);
          });
        });
      }
    );

    socket.on(
      ADD_MATCHUP,
      (teamIds: [string, string], trophyGoal: number, themeId: string) => {
        const playerPointCounters: [Counter, Counter] = [
          counterService.createCounter(shortid.generate()),
          counterService.createCounter(shortid.generate()),
        ];

        const trophyCounters: [Counter, Counter] = [
          counterService.createCounter(shortid.generate()),
          counterService.createCounter(shortid.generate()),
        ];

        const bonusPointCounter = counterService.createCounter(
          shortid.generate()
        );

        const matchup = matchupService.createTeamMatchup(
          shortid.generate(),
          teamIds,
          [playerPointCounters[0].id, playerPointCounters[1].id],
          [trophyCounters[0].id, trophyCounters[1].id],
          bonusPointCounter.id,
          trophyGoal,
          themeId
        );

        log('CREATING MATCHUP', matchup);
        Promise.all([
          counterDatastore.saveNewCounter(playerPointCounters[0]),
          counterDatastore.saveNewCounter(playerPointCounters[1]),
          counterDatastore.saveNewCounter(trophyCounters[0]),
          counterDatastore.saveNewCounter(trophyCounters[1]),
          counterDatastore.saveNewCounter(bonusPointCounter),
        ]).then(() => {
          matchupDatastore.saveNewMatchup(matchup).then(() => {
            resyncMatchups(socket);
          });
        });
      }
    );

    socket.on(TRIGGER_STATS_PUBLISH, () => {
      log('Re-publish stats');
      publishAllStats().then(() => {
        log('Stats published');
      });
    });

    socket.on(ASSIGN_RANDOM_POWERUPS, () => {
      log('Assigning random powerups to active players...');

      playerService.getPlayersAsync().then((players) => {
        players.forEach((player) => {
          const awardedPowerUp = getRandomPowerup();
          log('Assigning', player.name, awardedPowerUp);

          const updatedTags = incrementIntegerTag(
            `powerup_${awardedPowerUp}:`,
            1,
            player.tags
          );
          playerService.updatePlayerTags(player, updatedTags);
        });
      });
    });

    socket.on(ASSIGN_RANDOM_SNAKES_LADDERS_MOVES, () => {
      log('Assigning random moves to active players...');

      playerService.getPlayersAsync().then((players) => {
        players.forEach((player) => {
          if (player.tags.includes('retired')) {
            return;
          }
          const numberOfMoves = random.int(1, 10);
          log('Assigning moves', player.name, numberOfMoves);

          const updatedTags = [
            ...player.tags.filter((t) => !t.startsWith('sl_moves')),
            `sl_moves:${numberOfMoves}`,
          ];
          playerService.updatePlayerTags(player, updatedTags);
        });
      });
    });
  });
};

export default init;
