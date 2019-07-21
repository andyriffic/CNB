import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';

enum MATCHUP_EVENTS {
  SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS',
  ON_MATCHUPS_RECEIVED = 'ALL_MATCHUPS_UPDATE',
  SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP',
  ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED',
  START_GAME_FOR_MATCHUP = 'START_GAME_FOR_MATCHUP',
}

export enum GAME_STATUS {
  WaitingPlayerMoves = 'WaitingPlayerMoves',
  ReadyToPlay = 'ReadyToPlay',
  Finished = 'Finished',
}

export type Team = {
  id: string;
  name: string;
  points: number;
};

export type SpectatorMove = {
  moved: boolean;
  usedPowerup: boolean;
  playerName: string | null;
};

export type Game = {
  id: string;
  status: GAME_STATUS;
  moves: [SpectatorMove, SpectatorMove];
};

export type Matchup = {
  id: string;
  teams: [Team, Team];
  gameInProgress?: Game;
};

export type MatchupService = {
  loadingAllMatchups: boolean;
  allMatchups: Matchup[];
  subscribeToMatchup: (matchupId: string) => void;
  currentMatchup?: Matchup;
  clearCurrentMatchup: () => void;
  startGameForMatchup: (matchupId: string) => void;
};

const initialValue: MatchupService = {
  loadingAllMatchups: true,
  allMatchups: [],
  subscribeToMatchup: matchupId => {
    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_MATCHUP, matchupId);
  },
  clearCurrentMatchup: () => {},
  startGameForMatchup: matchupId => {
    socket.emit(MATCHUP_EVENTS.START_GAME_FOR_MATCHUP, matchupId);
  },
};

export const MatchupContext = React.createContext<MatchupService>(initialValue);

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/matchups-realz`
);

export const MatchupProvider = ({ children }: { children: ReactNode }) => {
  const [loadingAllMatchups, setLoadingAllMatchups] = useState(
    initialValue.loadingAllMatchups
  );
  const [allMatchups, setAllMatchups] = useState<Matchup[]>(
    initialValue.allMatchups
  );

  const [currentMatchup, setCurrentMatchup] = useState<Matchup>();

  useEffect(() => {
    socket.on(MATCHUP_EVENTS.ON_MATCHUPS_RECEIVED, (matchups: Matchup[]) => {
      setTimeout(() => {
        console.log('Matchups', matchups);
        setAllMatchups(matchups);
        setLoadingAllMatchups(false);
      }, 1000);
    });

    socket.on(MATCHUP_EVENTS.ON_MATCHUP_UPDATED, (matchup: Matchup) => {
      console.log('Received Matchup', matchup);
      setCurrentMatchup(matchup);
    });

    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_ALL_MATCHUPS);
  }, []);

  return (
    <MatchupContext.Provider
      value={{
        allMatchups,
        loadingAllMatchups,
        subscribeToMatchup: initialValue.subscribeToMatchup,
        startGameForMatchup: initialValue.startGameForMatchup,
        currentMatchup: currentMatchup,
        clearCurrentMatchup: () => {
          setCurrentMatchup(undefined);
        },
      }}
    >
      {children}
    </MatchupContext.Provider>
  );
};
