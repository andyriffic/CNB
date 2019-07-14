import { PlayerList, TeamList, Team } from './types';
import { ALL_PLAYERS, ALL_TEAMS } from './constants';

const getPlayersAsync = (): Promise<PlayerList> => {
  return Promise.resolve(ALL_PLAYERS);
};

const getAllTeamsAsync = (): Promise<TeamList> => {
  return Promise.resolve(ALL_TEAMS);
};

const getTeamByIdAsync = (id: string): Promise<Team | undefined> => {
  return Promise.resolve(ALL_TEAMS.find(team => team.id === id));
};

export const playerService = {
  getPlayersAsync,
  getAllTeamsAsync,
  getTeamByIdAsync,
};
