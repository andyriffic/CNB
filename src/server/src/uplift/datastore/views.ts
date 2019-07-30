import { matchupDatastore } from './matchup';
import { counterDatastore } from './counters';
import {
  MatchupSpectatorView,
  MatchupPlayerView,
  GameSpectatorView,
} from '../services/matchup/types';
import { Counter } from '../services/counter/types';
import { ALL_TEAMS, PLAYER_IDS_BY_TEAM } from '../services/player/constants';

const getMatchupSpectatorView = (
  matchupId: string,
  gameInProgress: GameSpectatorView | null
): Promise<MatchupSpectatorView> => {
  const promise = new Promise<MatchupSpectatorView>(resolve => {
    matchupDatastore.getMatchup(matchupId).then(matchup => {
      Promise.all([
        counterDatastore.getCounter(matchup.pointCounterIds[0]),
        counterDatastore.getCounter(matchup.pointCounterIds[1]),
      ]).then((points: [Counter, Counter]) => {
        const view: MatchupSpectatorView = {
          id: matchup.id,
          gameInProgress,
          teams: [
            {
              id: ALL_TEAMS.find(t => t.id === matchup.teamIds[0])!.id,
              name: ALL_TEAMS.find(t => t.id === matchup.teamIds[0])!.name,
              points: points[0].value,
            },
            {
              id: ALL_TEAMS.find(t => t.id === matchup.teamIds[1])!.id,
              name: ALL_TEAMS.find(t => t.id === matchup.teamIds[1])!.name,
              points: points[1].value,
            },
          ],
          trophyGoal: matchup.trophyGoal,
        };
        resolve(view);
      });
    });
  });

  return promise;
};

const getPlayerMatchupView = (
  matchupId: string,
  gameInProgress: GameSpectatorView | null,
  playerId: string
): Promise<MatchupPlayerView> => {
  const promise = new Promise<MatchupPlayerView>(resolve => {
    getMatchupSpectatorView(matchupId, gameInProgress).then(
      matchupSpectatorView => {
        // TODO: null checking
        const playersTeam = matchupSpectatorView.teams.find(team => {
          const inTeam = PLAYER_IDS_BY_TEAM[team.id].includes(playerId);
          console.log('Player is in team', team, inTeam);
          return inTeam;
        })!;

        resolve({ ...matchupSpectatorView, playerTeamId: playersTeam.id });
      }
    );
  });
  return promise;
};

export const viewsDatastore = {
  getMatchupSpectatorView,
  getPlayerMatchupView,
};
