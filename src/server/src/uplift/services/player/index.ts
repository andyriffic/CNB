import { PlayerList, TeamList, Team, TeamDetails } from './types';
import { ALL_PLAYERS, ALL_TEAMS, PLAYER_IDS_BY_TEAM } from './constants';

const getPlayersAsync = (): Promise<PlayerList> => {
  return Promise.resolve(ALL_PLAYERS);
};

const getAllTeamsAsync = (): Promise<TeamList> => {
  return Promise.resolve(ALL_TEAMS);
};

const getTeamByIdAsync = (id: string): Promise<Team | undefined> => {
  return Promise.resolve(ALL_TEAMS.find(team => team.id === id));
};

const getTeamsWithPlayers = (): TeamDetails[] => {
  return ALL_TEAMS.map((team) => {
    const teamPlayerIds = PLAYER_IDS_BY_TEAM[team.id];
    const players = teamPlayerIds.map(
      (playerId) => ALL_PLAYERS.find((player) => player.id === playerId)!);
    return {
      team,
      players
    }
  })
}

export const playerService = {
  getPlayersAsync,
  getAllTeamsAsync,
  getTeamByIdAsync,
  getTeamsWithPlayers
};
