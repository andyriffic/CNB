import { PlayerList, TeamList, Team, TeamDetails, Player } from './types';
import { ALL_TEAMS, PLAYER_IDS_BY_TEAM } from './constants';
import { playersDatastore } from '../../datastore/players';

let instantTeams: Team[] = [];
let instantPlayerIdsByTeam: { [teamId: string]: string[] } = {};

const getPlayersAsync = (): Promise<PlayerList> => {
  return playersDatastore.getAllPlayers();
};

const getPlayer = (id: string) => {
  return playersDatastore.getPlayer(id);
};

const updatePlayerTags = (player: Player, tags: string[]): Promise<Player> => {
  const updatedPlayer: Player = {
    ...player,
    tags,
  };
  return playersDatastore.updatePlayerTags(updatedPlayer);
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

const getTeamsWithPlayers = (allPlayers: Player[]): TeamDetails[] => {
  return ALL_TEAMS.map(team => {
    const teamPlayerIds = PLAYER_IDS_BY_TEAM[team.id];
    console.log('TEAMS-----', team, teamPlayerIds);
    const players = teamPlayerIds.map(
      playerId => allPlayers.find(player => player.id === playerId)!
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
  getPlayer,
  getAllTeams,
  getTeamByIdAsync,
  getTeamsWithPlayers,
  addInstantTeam,
  addPlayersToInstantTeam,
  getPlayerIdsByTeam,
  updatePlayerTags,
};
