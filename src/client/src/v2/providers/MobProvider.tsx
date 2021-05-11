import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { createSocket } from '../services/sockets';
import { Player } from './PlayersProvider';

enum MOB_EVENTS {
  REQUEST_MOB_GAMES = 'REQUEST_MOB_GAMES',
  MOB_GAMES_UPDATE = 'MOB_GAMES_UPDATE',
  CREATE_MOB_GAME = 'CREATE_MOB_GAME',
}

export type MoveId = 'A' | 'B' | 'C';

export type MobBasePlayer = {
  player: Player;
  lastMoveId?: MoveId;
};

export type MugPlayer = MobBasePlayer & {
  lives: number;
};

export type MobPlayer = MobBasePlayer & {
  active: boolean;
};

export type MobGame = {
  id: string;
  mobPlayers: MobPlayer[];
  mugPlayer: MugPlayer;
};

export type MobService = {
  mobGames?: MobGame[];
  createMobGame: (
    mug: Player,
    mob: Player[],
    onCreated: (id: string) => void
  ) => void;
};

export const MobContext = React.createContext<MobService | undefined>(
  undefined
);

const socket = createSocket('mob-mode');

export const MobProvider = ({ children }: { children: ReactNode }) => {
  const [mobGames, setMobGames] = useState<MobGame[]>([]);

  useEffect(() => {
    socket.on(MOB_EVENTS.MOB_GAMES_UPDATE, (mobGames: MobGame[]) => {
      setMobGames(mobGames);
    });
    socket.emit(MOB_EVENTS.REQUEST_MOB_GAMES);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MobContext.Provider
      value={{
        mobGames,
        createMobGame: (mug, mob, onCreated) => {
          socket.emit(MOB_EVENTS.CREATE_MOB_GAME, mug, mob, onCreated);
        },
      }}
    >
      {children}
    </MobContext.Provider>
  );
};

export function useMobProvider() {
  const context = React.useContext(MobContext);
  if (context === undefined) {
    throw new Error('useMobProvider must be used within a MobProvider');
  }
  return context;
}
