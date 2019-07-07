import { TeamList, Team } from './types';

const ALL_TEAMS = [{ id: 'xian', name: 'Xian' }, { id: 'melb', name: 'Melbourne' }];

const getAllTeamsAsync = (): Promise<TeamList> => {
  return Promise.resolve(ALL_TEAMS);
};

const getTeamByIdAsync = (id: string): Promise<Team | undefined> => {
  return Promise.resolve(ALL_TEAMS.find(team => team.id === id));
};

export default {
  getAllTeamsAsync,
  getTeamByIdAsync,
};
