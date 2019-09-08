import { PlayerList, TeamList, Team, TeamDetails } from './types';
import { ALL_PLAYERS, ALL_TEAMS, PLAYER_IDS_BY_TEAM } from './constants';

let instantTeams: Team[] = [];
let instantPlayerIdsByTeam: { [teamId: string]: string[] } = {};

const getPlayersAsync = (): Promise<PlayerList> => {
  return Promise.resolve(ALL_PLAYERS);
};

const getAllTeams = (): TeamList => {
  return [...ALL_TEAMS, ...instantTeams];
};

const getTeamByIdAsync = (id: string): Promise<Team | undefined> => {
  return Promise.resolve(ALL_TEAMS.find(team => team.id === id));
};

const addPlayersToInstantTeam = (playerIds: string[], teamId: string) => {
  instantPlayerIdsByTeam = {
    ...instantPlayerIdsByTeam,
    [teamId]: playerIds,
  };
};

const getPlayerIdsByTeam = (): { [teamId: string]: string[] } => {
  return {
    ...PLAYER_IDS_BY_TEAM,
    ...instantPlayerIdsByTeam,
  };
};

const getTeamsWithPlayers = (): TeamDetails[] => {
  return ALL_TEAMS.map(team => {
    const teamPlayerIds = PLAYER_IDS_BY_TEAM[team.id];
    console.log('TEAMS-----', team, teamPlayerIds);
    const players = teamPlayerIds.map(
      playerId => ALL_PLAYERS.find(player => player.id === playerId)!
    );
    return {
      team,
      players,
    };
  });
};

const addInstantTeam = (team: Team) => {
  instantTeams = [...instantTeams, team];
};

export const playerService = {
  getPlayersAsync,
  getAllTeams,
  getTeamByIdAsync,
  getTeamsWithPlayers,
  addInstantTeam,
  addPlayersToInstantTeam,
  getPlayerIdsByTeam,
};
