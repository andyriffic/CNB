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
} from '../services/matchup/types';
import { PLAYER_IDS_BY_TEAM } from '../services/player/constants';
import { viewsDatastore } from '../datastore/views';

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

const getMatchupView = (matchupId: string): Promise<MatchupSpectatorView> => {
  const hasGameInProgress = !!gamesInProgress[matchupId];
  return viewsDatastore.getMatchupSpectatorView(matchupId, hasGameInProgress);
};

const getPlayerMatchupView = (matchupId: string, playerId: string): Promise<MatchupPlayerView> => {
  console.log('getPlayerMatchupView', playerId);
  const hasGameInProgress = !!gamesInProgress[matchupId];
  return viewsDatastore.getPlayerMatchupView(matchupId, hasGameInProgress, playerId);
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
      ensureMatchups().then(matchups => {
        socket.emit(MATCHUPS_UPDATE, matchups);
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

        Promise.all(playerMatchups.map(mu => getPlayerMatchupView(mu.id, playerId))).then(
          allMatchupViews => {
            socket.join(playerId);
            socket.emit(PLAYER_MATCHUP_VIEW, allMatchupViews);
          }
        );
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
