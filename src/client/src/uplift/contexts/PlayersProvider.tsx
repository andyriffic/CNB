import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';

enum PLAYER_EVENTS {
  SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS',
  ON_PLAYERS_RECEIVED = 'ALL_PLAYERS_UPDATE',
}

export type Player = {
  id: string;
  name: string;
};

export type PlayerService = {
  allPlayers: Player[];
  loadingPlayers: boolean;
  subscribeToPlayers: () => void;
};

const initialValue: PlayerService = {
  allPlayers: [],
  loadingPlayers: true,
  subscribeToPlayers: () => {
    socket.emit(PLAYER_EVENTS.SUBSCRIBE_TO_ALL_PLAYERS);
  },
};

export const PlayersContext = React.createContext<PlayerService>(initialValue);

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/players-realz`
);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [loadingPlayers, setLoadingPlayers] = useState(
    initialValue.loadingPlayers
  );
  const [allPlayers, setAllPlayers] = useState<Player[]>(
    initialValue.allPlayers
  );

  useEffect(() => {
    socket.on(PLAYER_EVENTS.ON_PLAYERS_RECEIVED, (players: Player[]) => {
      setTimeout(() => {
        console.log('Players', players);
        setAllPlayers(players);
        setLoadingPlayers(false);
      }, 1000);
    });
    socket.emit(PLAYER_EVENTS.SUBSCRIBE_TO_ALL_PLAYERS);
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        loadingPlayers,
        allPlayers,
        subscribeToPlayers: initialValue.subscribeToPlayers,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
