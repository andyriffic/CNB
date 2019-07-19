import { Socket, Server, Namespace } from 'socket.io';
import { matchupService } from '../services/matchup';
import shortid from 'shortid';
import { matchupDatastore } from '../datastore/matchup';
import { counterService } from '../services/counter';
import { counterDatastore } from '../datastore/counters';
import {
  TeamMatchup,
  Game,
  MatchupSpectatorView,
  GameMoveUpdate,
  MatchupPlayerView,
  GameSpectatorView,
  GAME_STATUS,
  GameMove,
  MoveSpectatorView,
  GameResultSpectatorView,
  GameMoveResultSpectatorView,
} from '../services/matchup/types';
import { PLAYER_IDS_BY_TEAM, ALL_PLAYERS } from '../services/player/constants';
import { viewsDatastore } from '../datastore/views';
import { getGameStatus } from '../services/matchup/gameStatus';
import { playService } from '../services/play';
import { Counter } from '../services/counter/types';
import { GameResult } from '../services/game-result/types';

const MATCHUPS_UPDATE = 'MATCHUPS_UPDATE';
const REQUEST_MATCHUPS = 'REQUEST_MATCHUPS';
const REQUEST_MATCHUPS_FOR_PLAYER = 'REQUEST_MATCHUPS_FOR_PLAYER';
const PLAYER_MATCHUP_VIEW = 'PLAYER_MATCHUP_VIEW';
const ADD_MATCHUP = 'ADD_MATCHUP';
const WATCH_MATCHUP = 'WATCH_MATCHUP';
const MATCHUP_VIEW = 'MATCHUP_VIEW';
const START_GAME = 'START_GAME_FOR_MATCHUP';
const GAME_VIEW = 'MATCHUP_GAME_VIEW';
const MAKE_MOVE = 'MAKE_MATCHUP_MOVE';
const WATCH_GAME_FOR_MATCHUP = 'WATCH_GAME_FOR_MATCHUP';
const PLAY_GAME_FOR_MATCHUP = 'PLAY_GAME_FOR_MATCHUP';

let cachedMatchups: TeamMatchup[] | null = null;
let gamesInProgress: { [matchupId: string]: Game } = {};

const ensureMatchups = (): Promise<TeamMatchup[]> => {
  const promise = new Promise<TeamMatchup[]>(resolve => {
    if (cachedMatchups) {
      resolve(cachedMatchups);
      return;
    }
    matchupDatastore.getAllMatchups().then(matchups => {
      cachedMatchups = matchups;
      resolve(matchups);
    });
  });

  return promise;
};

const resyncMatchups = (socket: Socket) => {
  matchupDatastore
    .getAllMatchups()
    .then(matchups => {
      cachedMatchups = matchups;
      socket.emit(MATCHUPS_UPDATE, cachedMatchups);
    })
    .catch(error => {
      console.log('Matchups error', error);
      return error;
    });
};

const getSpectatorMove = (move: GameMove): MoveSpectatorView => {
  return {
    moved: !!move.moveId,
    usedPowerup: !!move.powerUpId && move.powerUpId !== 'NONE',
    playerName: move.playerId
      ? ALL_PLAYERS.find(p => p.id === move.playerId)!.name
      : null,
  };
};

const getSpectatorResultGameMove = (
  move: GameMove
): GameMoveResultSpectatorView => {
  return {
    moveId: move.moveId!,
    powerUpId: move.powerUpId!,
  };
};

const getSpectatorGameResult = (
  game: Game
): GameResultSpectatorView | undefined => {
  if (!game.result) {
    return undefined;
  }

  return {
    draw: game.result.draw,
    winnerIndex: game.result.winnerIndex,
    moves: [
      getSpectatorResultGameMove(game.moves[0]),
      getSpectatorResultGameMove(game.moves[1]),
    ],
  };
};

const getGameInProgress = (matchupId: string): GameSpectatorView | null => {
  const gameInProgress = gamesInProgress[matchupId];
  if (!gameInProgress) {
    return null;
  }

  return {
    id: gameInProgress.id,
    status: getGameStatus(gameInProgress),
    moves: [
      getSpectatorMove(gameInProgress.moves[0]),
      getSpectatorMove(gameInProgress.moves[1]),
    ],
    result: getSpectatorGameResult(gameInProgress),
  };
};

const getMatchupView = (matchupId: string): Promise<MatchupSpectatorView> => {
  return viewsDatastore.getMatchupSpectatorView(
    matchupId,
    getGameInProgress(matchupId)
  );
};

const getPlayerMatchupView = (
  matchupId: string,
  playerId: string
): Promise<MatchupPlayerView> => {
  console.log('getPlayerMatchupView', playerId);
  return viewsDatastore.getPlayerMatchupView(
    matchupId,
    getGameInProgress(matchupId),
    playerId
  );
};

const sendMatchupView = (matchupId: string, namespace: Namespace) => {
  getMatchupView(matchupId).then(matchupView => {
    console.log('Found matchup', matchupView);
    namespace.to(matchupId).emit(MATCHUP_VIEW, matchupView);
  });
};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to MATCHUPS', socket.id);

    socket.on(REQUEST_MATCHUPS, () => {
      ensureMatchups().then((matchups: TeamMatchup[]) => {
        Promise.all(
          matchups.map(matchup => getMatchupView(matchup.id))
        ).then((matchupViews: MatchupSpectatorView[]) => {
          socket.emit(MATCHUPS_UPDATE, matchupViews);
        });
      });
    });

    socket.on(REQUEST_MATCHUPS_FOR_PLAYER, (playerId: string) => {
      ensureMatchups().then(matchups => {
        const playerTeams = Object.keys(PLAYER_IDS_BY_TEAM).map(teamId => {
          const teamPlayers = PLAYER_IDS_BY_TEAM[teamId];
          return teamPlayers.includes(playerId) ? teamId : undefined;
        });

        console.log('REQUEST PLAYER MATCHUPS, MATCHUPS', playerId, matchups);

        const playerMatchups = matchups.filter(mu => {
          return mu.teamIds.some(t => playerTeams.includes(t));
        });
        console.log('Matchups for player', playerMatchups);

        playerMatchups.forEach(mu => {
          socket.join(mu.id);
        });

        Promise.all(
          playerMatchups.map(mu => getPlayerMatchupView(mu.id, playerId))
        ).then(allMatchupViews => {
          socket.join(playerId);
          socket.emit(PLAYER_MATCHUP_VIEW, allMatchupViews);
        });
      });
    });

    socket.on(WATCH_MATCHUP, matchupId => {
      console.log('RECEIVED WATCH MATCHUP', matchupId);
      socket.join(matchupId);
      // socket.emit(MATCHUP_VIEW, "TEST");
      sendMatchupView(matchupId, namespace);
    });

    socket.on(START_GAME, matchupId => {
      console.log('TRY TO START GAME FOR MATCHUP', matchupId);
      matchupDatastore.getMatchup(matchupId).then(matchup => {
        console.log('GOT MATCHUP', matchup);
        const game = matchupService.createGame(
          shortid.generate(),
          matchup.teamIds
        );
        gamesInProgress[matchupId] = game;
        namespace.to(matchupId).emit(GAME_VIEW, game);
        sendMatchupView(matchupId, namespace);
      });
    });

    socket.on(
      MAKE_MOVE,
      (matchupId: string, teamId: string, moveUpdate: GameMoveUpdate) => {
        console.log('MAKE MOVE RECEIVED', matchupId, teamId, moveUpdate);
        const updatedGame = matchupService.updateTeamMove(
          gamesInProgress[matchupId],
          teamId,
          moveUpdate
        );
        gamesInProgress[matchupId] = updatedGame;
        sendMatchupView(matchupId, namespace);
        namespace.to(matchupId).emit(GAME_VIEW, updatedGame);
      }
    );

    socket.on(WATCH_GAME_FOR_MATCHUP, matchupId => {
      console.log('Watching matchup for game', matchupId);
      socket.join(matchupId);
      const gameInProgress = gamesInProgress[matchupId];
      if (gameInProgress) {
        namespace.to(matchupId).emit(GAME_VIEW, gameInProgress);
      } else {
        namespace.to(matchupId).emit(GAME_VIEW, null);
      }
    });

    socket.on(PLAY_GAME_FOR_MATCHUP, (matchupId: string) => {
      console.log('RECEIVED: PLAY_GAME_FOR_MATCHUP', matchupId);

      const gameInProgress = gamesInProgress[matchupId];
      if (
        !gameInProgress ||
        getGameStatus(gameInProgress) !== GAME_STATUS.ReadyToPlay
      ) {
        console.log(
          'GAME COULD NOT BE PLAYED (may not exist, already have been played or not ready to be played'
        );
        return; // TODO: could throw error
      }

      ensureMatchups().then(matchups => {
        const matchup = matchups.find(mu => mu.id === matchupId)!;
        console.log('PLAYING GAME FOR MATCHUP', matchup);
        Promise.all([
          counterDatastore.getCounter(matchup.pointCounterIds[0]),
          counterDatastore.getCounter(matchup.pointCounterIds[1]),
        ]).then((points: [Counter, Counter]) => {
          const result = playService.playGame(gameInProgress, points);
          console.log('RESULT------------->', result);

          Promise.all([
            counterDatastore.updateCounter(result.points[0]),
            counterDatastore.updateCounter(result.points[1]),
          ]).then(() => {
            console.log('Saved!');
            gamesInProgress[matchupId] = matchupService.resolveGame(
              gamesInProgress[matchupId],
              result.gameResult
            );
            sendMatchupView(matchup.id, namespace);
          });
        });
      });
    });

    socket.on(ADD_MATCHUP, (teamIds: [string, string]) => {
      const player1PointsCounter = counterService.createCounter(
        shortid.generate()
      );
      const player2PointsCounter = counterService.createCounter(
        shortid.generate()
      );
      const playerPointCounterIds: [string, string] = [
        player1PointsCounter.id,
        player2PointsCounter.id,
      ];

      const matchup = matchupService.createTeamMatchup(
        shortid.generate(),
        teamIds,
        playerPointCounterIds
      );

      console.log('CREATING MATCHUP', matchup);
      Promise.all([
        counterDatastore.saveNewCounter(player1PointsCounter),
        counterDatastore.saveNewCounter(player2PointsCounter),
      ]).then(() => {
        matchupDatastore.saveNewMatchup(matchup).then(() => {
          resyncMatchups(socket);
        });
      });
    });
  });
};

export default init;
