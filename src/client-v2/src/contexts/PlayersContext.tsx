import React, { useState, useEffect, ReactNode, useMemo } from 'react';
import { createSocket } from '../services/sockets';
import { Player } from '../types/Player';

enum PLAYER_EVENTS {
  SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS',
  ON_PLAYERS_RECEIVED = 'ALL_PLAYERS_UPDATE',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
}

export type PlayerService = {
  allPlayers: Player[];
  activePlayers: Player[];
  updatePlayer: (id: string, tags: string[], onUpdated?: () => void) => void;
};

const PlayersContext = React.createContext<PlayerService | undefined>(
  undefined
);

const socket = createSocket('players-realz');

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  const activePlayers = useMemo(() => {
    return allPlayers.filter((p) => !p.tags.includes('retired'));
  }, [allPlayers]);

  useEffect(() => {
    socket.on(PLAYER_EVENTS.ON_PLAYERS_RECEIVED, (players: Player[]) => {
      setAllPlayers(players);
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
        allPlayers,
        activePlayers,
        updatePlayer: (id, tags, onUpdated) => {
          socket.emit(PLAYER_EVENTS.UPDATE_PLAYER, id, tags, onUpdated);
        },
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export function usePlayers() {
  const context = React.useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayersProvider must be used within a PlayersProvider');
  }
  return context;
}
