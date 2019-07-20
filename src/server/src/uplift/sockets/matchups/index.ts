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
const SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP';
const ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED';

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
      getMatchupView(matchupId, gamesInProgress).then((matchupView: MatchupSpectatorView) => {
        const matchupChannel = `matchup-${matchupId}`;
        socket.join(matchupChannel);
        namespace.to(matchupChannel).emit(ON_MATCHUP_UPDATED, matchupView);
      })
    });

  });
};

export default init;
