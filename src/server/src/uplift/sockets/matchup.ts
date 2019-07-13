import { Socket, Server } from 'socket.io';
import { games } from '../services/matchup';
import shortid from 'shortid';
import { matchupDatastore } from '../datastore/matchup';
import { counterOperations } from '../services/counter';
import { counterDatastore } from '../datastore/counters';

const MATCHUPS_UPDATE = 'MATCHUPS_UPDATE';
const REQUEST_MATCHUPS = 'REQUEST_MATCHUPS';
const ADD_MATCHUP = 'ADD_MATCHUP';

let cachedMatchups: any[] | null = null;

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

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to MATCHUPS', socket.id);

    socket.on(REQUEST_MATCHUPS, () => {
      if (cachedMatchups) {
        console.log('Sending cached matchps', cachedMatchups);
        socket.emit(MATCHUPS_UPDATE, cachedMatchups);
      } else {
        resyncMatchups(socket);
      }
    });

    socket.on(ADD_MATCHUP, (teamIds: [string, string]) => {
      const player1PointsCounter = counterOperations.createCounter(
        shortid.generate()
      );
      const player2PointsCounter = counterOperations.createCounter(
        shortid.generate()
      );
      const playerPointCounterIds: [string, string] = [
        player1PointsCounter.id,
        player2PointsCounter.id,
      ];

      const matchup = games.createTeamMatchup(
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
