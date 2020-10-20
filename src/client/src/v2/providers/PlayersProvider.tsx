import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';

enum PLAYER_EVENTS {
  SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS',
  ON_PLAYERS_RECEIVED = 'ALL_PLAYERS_UPDATE',
  ADD_PLAYER = 'ADD_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  TRIGGER_UPDATE = 'TRIGGER_UPDATE',
}

export type Player = {
  id: string;
  name: string;
  tags: string[];
  teams: string[];
  avatarImageUrl: string;
};

export type PlayerService = {
  allPlayers: Player[];
  loadingPlayers: boolean;
  subscribeToPlayers: () => void;
  addPlayer: (id: string, name: string, avatarImageUrl: string) => void;
  updatePlayer: (id: string, tags: string[], onUpdated?: () => void) => void;
  triggerUpdate: () => void;
};

const PlayersContext = React.createContext<PlayerService | undefined>(
  undefined
);

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/players-realz`);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.on(PLAYER_EVENTS.ON_PLAYERS_RECEIVED, (players: Player[]) => {
      console.log('Players', players);
      setAllPlayers(players);
      setLoadingPlayers(false);
    });
    socket.emit(PLAYER_EVENTS.SUBSCRIBE_TO_ALL_PLAYERS);

    return () => {
      console.log('Players', 'DISCONNECT');
      socket.disconnect();
    };
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        loadingPlayers,
        allPlayers,
        subscribeToPlayers: () => {
          socket.emit(PLAYER_EVENTS.SUBSCRIBE_TO_ALL_PLAYERS);
        },
        addPlayer: (id, name, avatarImageUrl) => {
          socket.emit(PLAYER_EVENTS.ADD_PLAYER, id, name, avatarImageUrl);
        },
        updatePlayer: (id, tags, onUpdated) => {
          socket.emit(PLAYER_EVENTS.UPDATE_PLAYER, id, tags, onUpdated);
        },
        triggerUpdate: () => {
          socket.emit(PLAYER_EVENTS.TRIGGER_UPDATE);
        },
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export function usePlayersProvider() {
  const context = React.useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayersProvider must be used within a PlayersProvider');
  }
  return context;
}
