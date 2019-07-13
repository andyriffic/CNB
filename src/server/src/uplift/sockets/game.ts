import { Socket, Server } from 'socket.io';
import shortid from 'shortid';
import { Game } from '../services/matchup/types';
import { games } from '../services/matchup';
import { matchupDatastore } from '../datastore/matchup';

const WATCH_GAME_FOR_MATCHUP = 'WATCH_GAME_FOR_MATCHUP';
const GAME_VIEW = 'MATCHUP_GAME_VIEW';
const START_GAME = 'START_GAME_FOR_MATCHUP';

let gamesInProgress: { [matchupId: string]: Game } = {};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to games', socket.id);

    socket.on(WATCH_GAME_FOR_MATCHUP, matchupId => {
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
      const game = games.createGame(shortid.generate(), matchup.teamIds);
        gamesInProgress[matchupId] = game;
        namespace.to(matchupId).emit(GAME_VIEW, game);
      });
    });
  });
};

export default init;
