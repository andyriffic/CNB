import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { createSocket } from '../services/sockets';
import { MoveKeys } from '../themes';
import { Player } from './PlayersProvider';

enum MOB_EVENTS {
  REQUEST_MOB_GAMES = 'REQUEST_MOB_GAMES',
  MOB_GAMES_UPDATE = 'MOB_GAMES_UPDATE',
  CREATE_MOB_GAME = 'CREATE_MOB_GAME',
  MAKE_MOB_MOVE = 'MAKE_MOB_MOVE',
  MAKE_MUG_MOVE = 'MAKE_MUG_MOVE',
  RESOLVE_MOB_GAME = 'RESOLVE_MOB_GAME',
  NEXT_ROUND_MOB_GAME = 'NEXT_ROUND_MOB_GAME',
}

export type MoveResult = 'won' | 'lost' | 'draw';

export type MobBasePlayer = {
  player: Player;
  lastMoveId?: MoveKeys;
};

export type MugPlayer = MobBasePlayer & {
  lives: number;
};

export type MobPlayer = MobBasePlayer & {
  active: boolean;
  lastRound: number;
  lastMoveResult?: MoveResult;
};

export type MobGame = {
  id: string;
  round: number;
  mobPlayers: MobPlayer[];
  mugPlayer: MugPlayer;
  ready: boolean;
  resolved: boolean;
  gameOver: boolean;
};

export type MobService = {
  mobGames?: MobGame[];
  createMobGame: (
    mug: Player,
    mob: Player[],
    onCreated: (id: string) => void
  ) => void;
  makeMobPlayerMove: (
    mobGameId: string,
    playerId: string,
    moveId: MoveKeys
  ) => void;
  makeMugPlayerMove: (mobGameId: string, moveId: MoveKeys) => void;
  resolveMobGame: (mobGameId: string) => void;
  nextRound: (mobGameId: string) => void;
};

export const MobContext = React.createContext<MobService | undefined>(
  undefined
);

const socket = createSocket('mob-mode');

export const MobProvider = ({ children }: { children: ReactNode }) => {
  const [mobGames, setMobGames] = useState<MobGame[]>([]);

  useEffect(() => {
    socket.on(MOB_EVENTS.MOB_GAMES_UPDATE, (mobGames: MobGame[]) => {
      console.log('MOBS', mobGames);
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
        makeMobPlayerMove: (mobGameId, playerId, moveId) => {
          socket.emit(MOB_EVENTS.MAKE_MOB_MOVE, mobGameId, playerId, moveId);
        },
        makeMugPlayerMove: (mobGameId, moveId) => {
          socket.emit(MOB_EVENTS.MAKE_MUG_MOVE, mobGameId, moveId);
        },
        resolveMobGame: mobGameId => {
          socket.emit(MOB_EVENTS.RESOLVE_MOB_GAME, mobGameId);
        },
        nextRound: mobGameId => {
          socket.emit(MOB_EVENTS.NEXT_ROUND_MOB_GAME, mobGameId);
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
