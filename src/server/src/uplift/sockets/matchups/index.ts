import { Socket, Server, Namespace } from 'socket.io';
import { matchupDatastore } from '../../datastore/matchup';
import {
  TeamMatchup,
  Game,
  MatchupSpectatorView,
} from '../../services/matchup/types';
import { getMatchupView } from './view-helpers';

const ALL_MATCHUPS_UPDATE = 'ALL_MATCHUPS_UPDATE';
const SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS';

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
  });
};

export default init;
