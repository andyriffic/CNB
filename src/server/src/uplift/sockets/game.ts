import { Socket, Server } from 'socket.io';
import shortid from 'shortid';
import { Game, GameMoveUpdate } from '../services/matchup/types';
import { matchupService } from '../services/matchup';
import { matchupDatastore } from '../datastore/matchup';

const WATCH_GAME_FOR_MATCHUP = 'WATCH_GAME_FOR_MATCHUP';
const GAME_VIEW = 'MATCHUP_GAME_VIEW';
const START_GAME = 'START_GAME_FOR_MATCHUP';
const MAKE_MOVE = 'MAKE_MATCHUP_MOVE';

let gamesInProgress: { [matchupId: string]: Game } = {};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to games', socket.id);

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
  });
};

export default init;
