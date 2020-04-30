import { matchupDatastore } from './matchup';
import { counterDatastore } from './counters';
import {
  MatchupSpectatorView,
  MatchupPlayerView,
  GameSpectatorView,
} from '../services/matchup/types';
import { Counter } from '../services/counter/types';
import { playerService } from '../services/player';
import { Player } from '../services/player/types';

const getMatchupSpectatorView = (
  matchupId: string,
  gameInProgress: GameSpectatorView | null
): Promise<MatchupSpectatorView> => {
  const promise = new Promise<MatchupSpectatorView>((resolve) => {
    matchupDatastore.getMatchup(matchupId).then((matchup) => {
      Promise.all([
        counterDatastore.getCounter(matchup.pointCounterIds[0]),
        counterDatastore.getCounter(matchup.pointCounterIds[1]),
        counterDatastore.getCounter(matchup.trophyCounterIds[0]),
        counterDatastore.getCounter(matchup.trophyCounterIds[1]),
        counterDatastore.getCounter(matchup.bonusCounterId),
        playerService.getPlayersAsync(),
      ]).then(
        (data: [Counter, Counter, Counter, Counter, Counter, Player[]]) => {
          console.log('---------MATCHUP----------', matchup.id);
          const allTeams = playerService.getAllTeams();
          const view: MatchupSpectatorView = {
            id: matchup.id,
            gameInProgress,
            teams: [
              {
                id: allTeams.find((t) => t.id === matchup.teamIds[0])!.id,
                name: allTeams.find((t) => t.id === matchup.teamIds[0])!.name,
                points: data[0].value,
                trophies: data[2].value,
                playerNames: playerService
                  .getPlayerIdsByTeam()
                  [matchup.teamIds[0]].map(
                    (playerId) => data[5].find((p) => p.id === playerId)!.name
                  ),
              },
              {
                id: allTeams.find((t) => t.id === matchup.teamIds[1])!.id,
                name: allTeams.find((t) => t.id === matchup.teamIds[1])!.name,
                points: data[1].value,
                trophies: data[3].value,
                playerNames: playerService
                  .getPlayerIdsByTeam()
                  [matchup.teamIds[1]].map(
                    (playerId) => data[5].find((p) => p.id === playerId)!.name
                  ),
              },
            ],
            trophyGoal: matchup.trophyGoal,
            bonusPoints: data[4].value,
            themeId: matchup.themeId,
          };
          resolve(view);
        }
      );
    });
  });

  return promise;
};

const getPlayerMatchupView = (
  matchupId: string,
  gameInProgress: GameSpectatorView | null,
  playerId: string
): Promise<MatchupPlayerView> => {
  const promise = new Promise<MatchupPlayerView>((resolve) => {
    getMatchupSpectatorView(matchupId, gameInProgress).then(
      (matchupSpectatorView) => {
        // TODO: null checking
        const playersTeam = matchupSpectatorView.teams.find((team) => {
          const inTeam = playerService
            .getPlayerIdsByTeam()
            [team.id].includes(playerId);
          // console.log('Player is in team', team, inTeam);
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
