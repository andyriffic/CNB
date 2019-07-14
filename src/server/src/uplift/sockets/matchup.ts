import { Socket, Server, Namespace } from 'socket.io';
import { matchupService } from '../services/matchup';
import shortid from 'shortid';
import { matchupDatastore } from '../datastore/matchup';
import { counterService } from '../services/counter';
import { counterDatastore } from '../datastore/counters';

const MATCHUPS_UPDATE = 'MATCHUPS_UPDATE';
const REQUEST_MATCHUPS = 'REQUEST_MATCHUPS';
const REQUEST_MATCHUPS_FOR_PLAYER = 'REQUEST_MATCHUPS_FOR_PLAYER';
const ADD_MATCHUP = 'ADD_MATCHUP';
const WATCH_MATCHUP = 'WATCH_MATCHUP';
const MATCHUP_VIEW = 'MATCHUP_VIEW';

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

const sendMatchupView = (matchupId: string, namespace: Namespace) => {
  matchupDatastore.getMatchup(matchupId).then(matchup => {
    console.log('Found matchup', matchup);
    namespace.to(matchupId).emit(MATCHUP_VIEW, matchup);
  })
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

    socket.on(REQUEST_MATCHUPS, () => {
      if (cachedMatchups) {
        console.log('Sending cached matchps', cachedMatchups);
        socket.emit(MATCHUPS_UPDATE, cachedMatchups);
      } else {
        resyncMatchups(socket);
      }
    });

    socket.on(WATCH_MATCHUP, matchupId => {
      console.log('RECEIVED WATCH MATCHUP', matchupId);
      socket.join(matchupId);
      // socket.emit(MATCHUP_VIEW, "TEST");
      sendMatchupView(matchupId, namespace);
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
