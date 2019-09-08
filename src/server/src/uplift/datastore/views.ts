import { matchupDatastore } from './matchup';
import { counterDatastore } from './counters';
import {
  MatchupSpectatorView,
  MatchupPlayerView,
  GameSpectatorView,
} from '../services/matchup/types';
import { Counter } from '../services/counter/types';
import { ALL_PLAYERS } from '../services/player/constants';
import { playerService } from '../services/player';
import { Team } from '../services/player/types';

const getMatchupSpectatorView = (
  matchupId: string,
  gameInProgress: GameSpectatorView | null
): Promise<MatchupSpectatorView> => {
  const promise = new Promise<MatchupSpectatorView>(resolve => {
    matchupDatastore.getMatchup(matchupId).then(matchup => {
      Promise.all([
        counterDatastore.getCounter(matchup.pointCounterIds[0]),
        counterDatastore.getCounter(matchup.pointCounterIds[1]),
        counterDatastore.getCounter(matchup.trophyCounterIds[0]),
        counterDatastore.getCounter(matchup.trophyCounterIds[1]),
      ]).then((counters: [Counter, Counter, Counter, Counter]) => {
        const allTeams = playerService.getAllTeams();
        const view: MatchupSpectatorView = {
          id: matchup.id,
          gameInProgress,
          teams: [
            {
              id: allTeams.find(t => t.id === matchup.teamIds[0])!.id,
              name: allTeams.find(t => t.id === matchup.teamIds[0])!.name,
              points: counters[0].value,
              trophies: counters[2].value,
              playerNames: playerService
                .getPlayerIdsByTeam()
                [matchup.teamIds[0]].map(
                  playerId => ALL_PLAYERS.find(p => p.id === playerId)!.name
                ),
            },
            {
              id: allTeams.find(t => t.id === matchup.teamIds[1])!.id,
              name: allTeams.find(t => t.id === matchup.teamIds[1])!.name,
              points: counters[1].value,
              trophies: counters[3].value,
              playerNames: playerService
                .getPlayerIdsByTeam()
                [matchup.teamIds[1]].map(
                  playerId => ALL_PLAYERS.find(p => p.id === playerId)!.name
                ),
            },
          ],
          trophyGoal: matchup.trophyGoal,
          themeId: matchup.themeId,
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
          const inTeam = playerService
            .getPlayerIdsByTeam()
            [team.id].includes(playerId);
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
