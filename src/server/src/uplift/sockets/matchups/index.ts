import { Socket, Server, Namespace } from 'socket.io';
import shortid from 'shortid';
import { matchupDatastore } from '../../datastore/matchup';
import {
  TeamMatchup,
  Game,
  MatchupSpectatorView,
  GameMoveUpdate,
} from '../../services/matchup/types';
import { getMatchupView, getPlayerMatchupView } from './view-helpers';
import { matchupService } from '../../services/matchup';
import { PLAYER_IDS_BY_TEAM } from '../../services/player/constants';

const ALL_MATCHUPS_UPDATE = 'ALL_MATCHUPS_UPDATE';
const SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS';
const SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP';
const ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED';
const START_GAME_FOR_MATCHUP = 'START_GAME_FOR_MATCHUP';
const MAVE_MOVE_FOR_MATCHUP = 'MAVE_MOVE_FOR_MATCHUP';
const SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER = 'SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER';
const MATCHUPS_FOR_PLAYER_UPDATE = 'MATCHUPS_FOR_PLAYER_UPDATE';

let gamesInProgress: { [matchupId: string]: Game } = {};

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
      matchupDatastore.getAllMatchups().then(matchups => {
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
          playerMatchups.map(mu =>
            getPlayerMatchupView(mu.id, playerId, gamesInProgress)
          )
        ).then(allMatchupViews => {
          // socket.join(playerId); TODO: how to keep player updated of their matchups...
          socket.emit(MATCHUPS_FOR_PLAYER_UPDATE, {
            [playerId]: allMatchupViews,
          });
        });
      });
    });
  });
};

export default init;
