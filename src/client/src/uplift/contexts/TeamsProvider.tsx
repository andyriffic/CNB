import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { Team } from './MatchupProvider';
import { Player } from './PlayersProvider';

enum TEAM_EVENTS {
  REQUEST_TEAMS = 'REQUEST_TEAMS',
  TEAMS_UPDATE = 'TEAMS_UPDATE',
}

export type TeamDetails = {
  team: Team;
  players: Player[];
}

export type TeamService = {
  loading: boolean;
  allTeamDetails: TeamDetails[];
  subscribeToTeams: () => void;
};

const initialValue: TeamService = {
  loading: true,
  allTeamDetails: [],
  subscribeToTeams: () => {
    socket.emit(TEAM_EVENTS.REQUEST_TEAMS);
  },
};

export const TeamsContext = React.createContext<TeamService>(initialValue);

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/teams-realz`);

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(
    initialValue.loading
  );
  const [allTeamDetails, setAllTeamDetails] = useState<TeamDetails[]>(
    initialValue.allTeamDetails
  );

  useEffect(() => {
    socket.on(TEAM_EVENTS.TEAMS_UPDATE, (teamDetails: TeamDetails[]) => {
      setTimeout(() => {
        console.log('Team Details', teamDetails);
        setAllTeamDetails(teamDetails);
        setLoading(false);
      }, 1000);
    });
    socket.emit(TEAM_EVENTS.REQUEST_TEAMS);
  }, []);

  return (
    <TeamsContext.Provider
      value={{
        loading,
        allTeamDetails,
        subscribeToTeams: initialValue.subscribeToTeams,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
