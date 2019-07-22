import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';

enum MATCHUP_EVENTS {
  SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS',
  ON_MATCHUPS_RECEIVED = 'ALL_MATCHUPS_UPDATE',
  SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP',
  ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED',
  START_GAME_FOR_MATCHUP = 'START_GAME_FOR_MATCHUP',
  MAVE_MOVE_FOR_MATCHUP = 'MAVE_MOVE_FOR_MATCHUP',
  SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER = 'SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER',
  MATCHUPS_FOR_PLAYER_UPDATE = 'MATCHUPS_FOR_PLAYER_UPDATE',
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

export type MatchupForPlayer = {
  playerTeamId: string;
} & Matchup;

export type MatchupService = {
  loadingAllMatchups: boolean;
  allMatchups: Matchup[];
  subscribeToMatchup: (matchupId: string) => void;
  currentMatchup?: Matchup;
  clearCurrentMatchup: () => void;
  startGameForMatchup: (matchupId: string) => void;
  subscribeToMatchupsForPlayer: (playerId: string) => void;
  matchupsByPlayerId: { [playerId: string]: MatchupForPlayer[] };
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
  subscribeToMatchupsForPlayer: playerId => {
    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER, playerId);
  },
  matchupsByPlayerId: {},
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
  const [matchupsByPlayerId, setMatchupsByPlayerId] = useState(
    initialValue.matchupsByPlayerId
  );

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

    socket.on(
      MATCHUP_EVENTS.MATCHUPS_FOR_PLAYER_UPDATE,
      (matchupsForPlayer: { [playerId: string]: MatchupForPlayer[] }) => {
        console.log('Received Matchup', matchupsForPlayer);
        setMatchupsByPlayerId(matchupsForPlayer);
      }
    );

    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_ALL_MATCHUPS); // TODO: don't always emit this
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
        subscribeToMatchupsForPlayer: initialValue.subscribeToMatchupsForPlayer,
        matchupsByPlayerId,
      }}
    >
      {children}
    </MatchupContext.Provider>
  );
};
