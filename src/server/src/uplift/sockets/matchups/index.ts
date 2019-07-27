import { Socket, Server, Namespace } from 'socket.io';
import shortid from 'shortid';
import { matchupDatastore } from '../../datastore/matchup';
import {
  TeamMatchup,
  Game,
  MatchupSpectatorView,
  GameMoveUpdate,
  GAME_STATUS,
} from '../../services/matchup/types';
import { getMatchupView, getPlayerMatchupView } from './view-helpers';
import { matchupService } from '../../services/matchup';
import { PLAYER_IDS_BY_TEAM } from '../../services/player/constants';
import { broadcastPlayerMatchups } from './common';
import { getGameStatus } from '../../services/matchup/gameStatus';
import { counterDatastore } from '../../datastore/counters';
import { Counter } from '../../services/counter/types';
import { playService } from '../../services/play';

const ALL_MATCHUPS_UPDATE = 'ALL_MATCHUPS_UPDATE';
const SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS';
const SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP';
const ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED';
const START_GAME_FOR_MATCHUP = 'START_GAME_FOR_MATCHUP';
const MAVE_MOVE_FOR_MATCHUP = 'MAVE_MOVE_FOR_MATCHUP';
const SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER = 'SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER';
const MATCHUPS_FOR_PLAYER_UPDATE = 'MATCHUPS_FOR_PLAYER_UPDATE';
const PLAY_GAME_FOR_MATCHUP = 'PLAY_GAME_FOR_MATCHUP';

let gamesInProgress: { [matchupId: string]: Game } = {};
let watchupPlayerIds: string[] = [];

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to MATCHUPS', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_MATCHUPS, () => {
      matchupDatastore.getAllMatchups().then((matchups: TeamMatchup[]) => {
        Promise.all(
          matchups.map(matchup => getMatchupView(matchup.id, gamesInProgress))
        ).then((matchupViews: MatchupSpectatorView[]) => {
          socket.emit(ALL_MATCHUPS_UPDATE, matchupViews);
        });
      });
    });

    socket.on(SUBSCRIBE_TO_MATCHUP, matchupId => {
      console.log('RECEIVED', SUBSCRIBE_TO_MATCHUP, matchupId);
      getMatchupView(matchupId, gamesInProgress).then(
        (matchupView: MatchupSpectatorView) => {
          const matchupChannel = `matchup-${matchupId}`;
          socket.join(matchupChannel);
          namespace.to(matchupChannel).emit(ON_MATCHUP_UPDATED, matchupView);
        }
      );
    });

    socket.on(START_GAME_FOR_MATCHUP, matchupId => {
      console.log('RECEIVED', START_GAME_FOR_MATCHUP, matchupId);
      matchupDatastore.getMatchup(matchupId).then(matchup => {
        console.log('GOT MATCHUP', matchup);
        const game = matchupService.createGame(
          shortid.generate(),
          matchup.teamIds
        );
        gamesInProgress[matchupId] = game;
        getMatchupView(matchupId, gamesInProgress).then(matchupView => {
          const matchupChannel = `matchup-${matchupId}`;
          namespace.to(matchupChannel).emit(ON_MATCHUP_UPDATED, matchupView);
        });

        watchupPlayerIds.forEach(playerId => {
          broadcastPlayerMatchups(playerId, gamesInProgress, namespace);
        });
      });
    });

    socket.on(
      MAVE_MOVE_FOR_MATCHUP,
      (matchupId: string, teamId: string, moveUpdate: GameMoveUpdate) => {
        console.log(
          'RECEIVED',
          MAVE_MOVE_FOR_MATCHUP,
          matchupId,
          teamId,
          moveUpdate
        );
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
      console.log('RECEIVED', SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER, playerId);
      if (!watchupPlayerIds.includes(playerId)) {
        watchupPlayerIds = [...watchupPlayerIds, playerId];
      }
      broadcastPlayerMatchups(playerId, gamesInProgress, namespace);
    });

    socket.on(PLAY_GAME_FOR_MATCHUP, (matchupId: string) => {
      console.log('RECEIVED', PLAY_GAME_FOR_MATCHUP, matchupId);

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

      matchupDatastore.getMatchup(matchupId).then(matchup => {
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
            getMatchupView(matchupId, gamesInProgress).then(matchupView => {
              const matchupChannel = `matchup-${matchupId}`;
              namespace
                .to(matchupChannel)
                .emit(ON_MATCHUP_UPDATED, matchupView);
            });
          });
        });
      });
    });
  });
};

export default init;
