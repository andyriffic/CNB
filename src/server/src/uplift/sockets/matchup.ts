import { Socket, Server } from 'socket.io';
import { matchupService } from '../services/matchup';
import shortid from 'shortid';
import { matchupDatastore } from '../datastore/matchup';
import { counterService } from '../services/counter';
import { counterDatastore } from '../datastore/counters';
import { TeamMatchup } from '../services/matchup/types';
import { Counter } from '../services/counter/types';

const MATCHUPS_UPDATE = 'MATCHUPS_UPDATE';
const ADD_MATCHUP = 'ADD_MATCHUP';

let cachedMatchups: TeamMatchup[] | null = null;

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
    console.log('someone connected to OLD MATCHUPS', socket.id);

    socket.on(
      ADD_MATCHUP,
      (teamIds: [string, string], trophyGoal: number = 3) => {
        const playerPointCounters: [Counter, Counter] = [
          counterService.createCounter(shortid.generate()),
          counterService.createCounter(shortid.generate()),
        ];

        const trophyCounters: [Counter, Counter] = [
          counterService.createCounter(shortid.generate()),
          counterService.createCounter(shortid.generate()),
        ];

        const matchup = matchupService.createTeamMatchup(
          shortid.generate(),
          teamIds,
          [playerPointCounters[0].id, playerPointCounters[1].id],
          [trophyCounters[0].id, trophyCounters[1].id],
          trophyGoal
        );

        console.log('CREATING MATCHUP', matchup);
        Promise.all([
          counterDatastore.saveNewCounter(playerPointCounters[0]),
          counterDatastore.saveNewCounter(playerPointCounters[1]),
          counterDatastore.saveNewCounter(trophyCounters[0]),
          counterDatastore.saveNewCounter(trophyCounters[1]),
        ]).then(() => {
          matchupDatastore.saveNewMatchup(matchup).then(() => {
            resyncMatchups(socket);
          });
        });
      }
    );
  });
};

export default init;
