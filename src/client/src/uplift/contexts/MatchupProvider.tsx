import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';

const MATCHUP_EVENTS = {
  SUBSCRIBE_TO_ALL_MATCHUPS: 'REQUEST_MATCHUPS',
  ON_MATCHUPS_RECEIVED: 'MATCHUPS_UPDATE',
};

export type Team = {
  id: string;
  name: string;
  points: number;
};

export type Matchup = {
  id: string;
  teams: [Team, Team];
};

export type MatchupService = {
  loadingAllMatchups: boolean;
  allMatchups: Matchup[];
};

const initialValue: MatchupService = {
  loadingAllMatchups: true,
  allMatchups: [],
};

export const MatchupContext = React.createContext<MatchupService>(initialValue);

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/matchups`
);

export const MatchupProvider = ({ children }: { children: ReactNode }) => {
  const [loadingAllMatchups, setLoadingAllMatchups] = useState(
    initialValue.loadingAllMatchups
  );
  const [allMatchups, setAllMatchups] = useState<Matchup[]>(
    initialValue.allMatchups
  );

  useEffect(() => {
    socket.on(MATCHUP_EVENTS.ON_MATCHUPS_RECEIVED, (matchups: Matchup[]) => {
      setTimeout(() => {
        console.log('Matchups', matchups);
        setAllMatchups(matchups);
        setLoadingAllMatchups(false);
      }, 1000);
    });

    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_ALL_MATCHUPS);
  }, []);

  return (
    <MatchupContext.Provider value={{ allMatchups, loadingAllMatchups }}>
      {children}
    </MatchupContext.Provider>
  );
};
