import { matchupDatastore } from '../../datastore/matchup';
import { PLAYER_IDS_BY_TEAM } from '../../services/player/constants';
import { getPlayerMatchupView } from './view-helpers';
import { Game } from '../../services/matchup/types';
import { Namespace } from 'socket.io';

const MATCHUPS_FOR_PLAYER_UPDATE = 'MATCHUPS_FOR_PLAYER_UPDATE';

export const broadcastPlayerMatchups = (
  playerId: string,
  gamesInProgress: { [matchupId: string]: Game },
  namespace: Namespace
) => {
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

    // TODO: is joining a channel better than managing watchupPlayerIds in index.js?
    // playerMatchups.forEach(mu => {
    //   namespace.join(mu.id);
    // });

    Promise.all(
      playerMatchups.map(mu =>
        getPlayerMatchupView(mu.id, playerId, gamesInProgress)
      )
    ).then(allMatchupViews => {
      // socket.join(playerId); TODO: how to keep player updated of their matchups...
      namespace.emit(MATCHUPS_FOR_PLAYER_UPDATE, {
        [playerId]: allMatchupViews,
      });
    });
  });
};
