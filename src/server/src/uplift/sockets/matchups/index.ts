import { Socket, Server, Namespace } from 'socket.io';
import shortid from 'shortid';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import { matchupDatastore } from '../../datastore/matchup';
import {
  TeamMatchup,
  Game,
  MatchupSpectatorView,
  GameMoveUpdate,
  GAME_STATUS,
  PLAY_MODE,
} from '../../services/matchup/types';
import { getMatchupView } from './view-helpers';
import { matchupService } from '../../services/matchup';
import { ALL_PLAYERS } from '../../services/player/constants';
import { broadcastPlayerMatchups } from './common';
import { getGameStatus } from '../../services/matchup/gameStatus';
import { counterDatastore } from '../../datastore/counters';
import { Counter } from '../../services/counter/types';
import { playService } from '../../services/play';
import { counterService } from '../../services/counter';
import { StatsService } from '../../services/stats';
import { publishStats } from '../../../stats/publishStats';
import { mapMatchupViewToGameStatsEntry } from '../../services/stats/mappers';
import { playerService } from '../../services/player';
import {
  getStartingGameAttributes,
  getMoveGameAttributes,
} from '../../services/matchup/timebomb';

const ALL_MATCHUPS_UPDATE = 'ALL_MATCHUPS_UPDATE';
const SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS';
const SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP';
const ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED';
const START_GAME_FOR_MATCHUP = 'START_GAME_FOR_MATCHUP';
const MAVE_MOVE_FOR_MATCHUP = 'MAVE_MOVE_FOR_MATCHUP';
const SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER = 'SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER';
const MATCHUPS_FOR_PLAYER_UPDATE = 'MATCHUPS_FOR_PLAYER_UPDATE';
const PLAY_GAME_FOR_MATCHUP = 'PLAY_GAME_FOR_MATCHUP';
const SET_GAME_VIEWED = 'SET_GAME_VIEWED';
const ADD_INSTANT_MATCHUP = 'ADD_INSTANT_MATCHUP';

let gamesInProgress: { [matchupId: string]: Game } = {};
let watchupPlayerIds: string[] = [];

const log = createLogger('matchups', LOG_NAMESPACE.socket);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    log('someone connected to MATCHUPS', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_MATCHUPS, () => {
      matchupDatastore
        .getAllMatchups()
        .then(matchups =>
          matchups.filter(matchup => !matchup.id.startsWith('instant'))
        )
        .then((matchups: TeamMatchup[]) => {
          Promise.all(
            matchups.map(matchup => getMatchupView(matchup.id, gamesInProgress))
          ).then((matchupViews: MatchupSpectatorView[]) => {
            socket.emit(ALL_MATCHUPS_UPDATE, matchupViews);
          });
        });
    });

    socket.on(SUBSCRIBE_TO_MATCHUP, matchupId => {
      log('RECEIVED', SUBSCRIBE_TO_MATCHUP, matchupId);
      getMatchupView(matchupId, gamesInProgress).then(
        (matchupView: MatchupSpectatorView) => {
          const matchupChannel = `matchup-${matchupId}`;
          socket.join(matchupChannel);
          namespace.to(matchupChannel).emit(ON_MATCHUP_UPDATED, matchupView);
        }
      );
    });

    socket.on(
      START_GAME_FOR_MATCHUP,
      (
        matchupId: string,
        playMode?: PLAY_MODE,
        startingAttributes?: { [key: string]: any }
      ) => {
        log('RECEIVED', START_GAME_FOR_MATCHUP, matchupId);
        matchupDatastore.getMatchup(matchupId).then(matchup => {
          log('GOT MATCHUP', matchup);

          Promise.all([
            counterDatastore.getCounter(matchup.pointCounterIds[0]),
            counterDatastore.getCounter(matchup.pointCounterIds[1]),
          ])
            .then((currentPoints: [Counter, Counter]):
              | [Counter, Counter]
              | Promise<[Counter, Counter]> => {
              const trophyWon = currentPoints.reduce(
                (acc, point) => acc || point.value >= matchup.trophyGoal,
                false
              );

              log('PLAY MODE IS', playMode);

              //TODO: playmode specific code can move somewhere else (just adding to the mess for now 😝)
              const game = matchupService.createGame(
                shortid.generate(),
                matchup.teamIds,
                trophyWon,
                playMode,
                playMode === PLAY_MODE.Timebomb
                  ? getStartingGameAttributes(gamesInProgress[matchupId])
                  : undefined
              );

              gamesInProgress[matchupId] = game;

              if (trophyWon) {
                log('------- RESET POINTS--------');
                return Promise.all([
                  counterDatastore.updateCounter(
                    counterService.resetCounter(currentPoints[0])
                  ),
                  counterDatastore.updateCounter(
                    counterService.resetCounter(currentPoints[1])
                  ),
                ]);
              }

              log('------- DONT NEED TO RESET POINTS--------');
              return currentPoints;
            })
            .finally(() => {
              log('------- BROADCAST UPDATE --------');
              getMatchupView(matchupId, gamesInProgress).then(matchupView => {
                const matchupChannel = `matchup-${matchupId}`;
                namespace
                  .to(matchupChannel)
                  .emit(ON_MATCHUP_UPDATED, matchupView);
              });

              watchupPlayerIds.forEach(playerId => {
                broadcastPlayerMatchups(playerId, gamesInProgress, namespace);
              });
            });
        });
      }
    );

    socket.on(
      MAVE_MOVE_FOR_MATCHUP,
      (matchupId: string, teamId: string, moveUpdate: GameMoveUpdate) => {
        log('RECEIVED', MAVE_MOVE_FOR_MATCHUP, matchupId, teamId, moveUpdate);
        const updatedGame = matchupService.updateTeamMove(
          gamesInProgress[matchupId],
          teamId,
          moveUpdate
        );
        gamesInProgress[matchupId] = updatedGame;
        getMatchupView(matchupId, gamesInProgress).then(matchupView => {
          const matchupChannel = `matchup-${matchupId}`;
          namespace.to(matchupChannel).emit(ON_MATCHUP_UPDATED, matchupView);
        });
      }
    );

    socket.on(SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER, (playerId: string) => {
      log('RECEIVED', SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER, playerId);
      if (!watchupPlayerIds.includes(playerId)) {
        watchupPlayerIds = [...watchupPlayerIds, playerId];
      }
      broadcastPlayerMatchups(playerId, gamesInProgress, namespace);
    });

    socket.on(PLAY_GAME_FOR_MATCHUP, (matchupId: string) => {
      log('RECEIVED', PLAY_GAME_FOR_MATCHUP, matchupId);

      const gameInProgress = gamesInProgress[matchupId];
      if (
        !gameInProgress ||
        getGameStatus(gameInProgress) !== GAME_STATUS.ReadyToPlay
      ) {
        log(
          'GAME COULD NOT BE PLAYED (may not exist, already have been played or not ready to be played'
        );
        return; // TODO: could throw error
      }

      matchupDatastore.getMatchup(matchupId).then(matchup => {
        log('PLAYING GAME FOR MATCHUP', matchup);
        Promise.all([
          counterDatastore.getCounter(matchup.pointCounterIds[0]),
          counterDatastore.getCounter(matchup.pointCounterIds[1]),
          counterDatastore.getCounter(matchup.trophyCounterIds[0]),
          counterDatastore.getCounter(matchup.trophyCounterIds[1]),
        ]).then((counters: [Counter, Counter, Counter, Counter]) => {
          const result = playService.playGame(
            gameInProgress,
            [counters[0], counters[1]],
            [counters[2], counters[3]],
            undefined,
            matchup.trophyGoal
          );

          log('RESULT------------->', result);

          Promise.all([
            counterDatastore.updateCounter(result.points[0]),
            counterDatastore.updateCounter(result.points[1]),
            counterDatastore.updateCounter(result.trophies[0]),
            counterDatastore.updateCounter(result.trophies[1]),
          ]).then(() => {
            log('Saved all counters');
            gamesInProgress[matchupId] = matchupService.resolveGame(
              gamesInProgress[matchupId],
              result.gameResult,
              result.trophyWon
            );

            //TODO: tidy up or move! 😬
            if (gamesInProgress[matchupId].playMode === PLAY_MODE.Timebomb) {
              gamesInProgress[matchupId] = {
                ...gamesInProgress[matchupId],
                gameAttributes: {
                  ...getMoveGameAttributes(
                    gamesInProgress[matchupId],
                    gamesInProgress[matchupId].result!
                  ),
                },
              };

              log(
                'TIMEBOMB ATTRIBUTES------------->',
                gamesInProgress[matchupId]
              );
            }

            getMatchupView(matchupId, gamesInProgress).then(matchupView => {
              if (
                matchupView.teams.some(team =>
                  team.name.toLowerCase().startsWith('test')
                )
              ) {
                log('Test team, not saving stats');
              } else {
                const statsEntry = mapMatchupViewToGameStatsEntry(matchupView);
                if (statsEntry) {
                  log('Saving stats entry...');
                  StatsService.saveGameStatsEntry(statsEntry);
                  log('Publishing stats...');
                  publishStats();
                }
              }

              const matchupChannel = `matchup-${matchupId}`;
              namespace
                .to(matchupChannel)
                .emit(ON_MATCHUP_UPDATED, matchupView);
            });
          });
        });
      });
    });

    socket.on(SET_GAME_VIEWED, (matchupId: string) => {
      log('RECEIVED', SET_GAME_VIEWED, matchupId);

      const gameInProgress = gamesInProgress[matchupId];
      if (!gameInProgress) {
        log('GAME COULD NOT BE FOUND');
        return; // TODO: could throw error
      }

      if (gameInProgress.viewed) {
        log('Game has already been viewed, no need to update');
        return;
      }

      gamesInProgress[matchupId] = matchupService.setGamedViewed(
        gameInProgress
      );

      getMatchupView(matchupId, gamesInProgress).then(matchupView => {
        const matchupChannel = `matchup-${matchupId}`;
        namespace.to(matchupChannel).emit(ON_MATCHUP_UPDATED, matchupView);
      });
    });

    socket.on(
      ADD_INSTANT_MATCHUP,
      (
        playerIds: [string, string],
        trophyGoal: number,
        themeId: string,
        confirmation: (matchupId: string) => void
      ) => {
        const playerPointCounters: [Counter, Counter] = [
          counterService.createCounter(`instant-${shortid.generate()}`),
          counterService.createCounter(`instant-${shortid.generate()}`),
        ];

        const trophyCounters: [Counter, Counter] = [
          counterService.createCounter(`instant-${shortid.generate()}`),
          counterService.createCounter(`instant-${shortid.generate()}`),
        ];

        const instantTeamIds: [string, string] = [
          `instant-team-${playerIds[0]}-${shortid.generate()}`,
          `instant-team-${playerIds[1]}-${shortid.generate()}`,
        ];

        playerIds.forEach((playerId, index) => {
          playerService.addInstantTeam({
            id: instantTeamIds[index],
            name: ALL_PLAYERS.find(p => p.id === playerId)!.name,
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
          trophyGoal,
          themeId
        );

        log('CREATING MATCHUP', matchup);
        Promise.all([
          counterDatastore.saveNewCounter(playerPointCounters[0]),
          counterDatastore.saveNewCounter(playerPointCounters[1]),
          counterDatastore.saveNewCounter(trophyCounters[0]),
          counterDatastore.saveNewCounter(trophyCounters[1]),
        ]).then(() => {
          matchupDatastore.saveNewMatchup(matchup).then(() => {
            confirmation(matchup.id);
          });
        });
      }
    );
  });
};

export default init;
