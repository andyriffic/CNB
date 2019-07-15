import { matchupDatastore } from './matchup';
import { counterDatastore } from './counters';
import { MatchupSpectatorView } from '../services/matchup/types';
import { Counter } from '../services/counter/types';
import { ALL_TEAMS } from '../services/player/constants';

const getMatchupSpectatorView = (
  matchupId: string
): Promise<MatchupSpectatorView> => {
  const promise = new Promise<MatchupSpectatorView>(resolve => {
    matchupDatastore.getMatchup(matchupId).then(matchup => {
      Promise.all([
        counterDatastore.getCounter(matchup.pointCounterIds[0]),
        counterDatastore.getCounter(matchup.pointCounterIds[1]),
      ]).then((points: [Counter, Counter]) => {
        const view: MatchupSpectatorView = {
          id: matchup.id,
          teams: [
            {
              name: ALL_TEAMS.find(t => t.id === matchup.teamIds[0])!.name,
              points: points[0].value,
            },
            {
              name: ALL_TEAMS.find(t => t.id === matchup.teamIds[1])!.name,
              points: points[1].value,
            },
          ],
        };
        resolve(view);
      });
    });
  });

  return promise;
};

export const viewsDatastore = {
  getMatchupSpectatorView,
};
