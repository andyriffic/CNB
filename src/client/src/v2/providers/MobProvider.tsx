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
  VIEWED_MOB_GAME_ROUND = 'VIEWED_MOB_GAME_ROUND',
}

export type MobRoundState =
  | 'waiting-moves'
  | 'ready-to-play'
  | 'resolved-results'
  | 'viewed';

export type MoveResult = 'won' | 'lost' | 'draw';
export type MobGameType = 'standard' | 'draw-ok-1-2' | 'draw-ok-1';

export type MobBasePlayer = {
  playerId: string;
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

export type MobGamePoints = {
  mugPlayer: number;
  mobPlayers: { playerId: string; points: number }[];
};

export type MobGame = {
  id: string;
  gameType: MobGameType;
  round: number;
  roundState: MobRoundState;
  mobPlayers: MobPlayer[];
  mugPlayer: MugPlayer;
  ready: boolean;
  resolved: boolean;
  gameOver: boolean;
  points: MobGamePoints;
};

type CreateMobParams = {
  mug: Player;
  mob: Player[];
  gameType: MobGameType;
};

export type MobService = {
  mobGames?: MobGame[];
  createMobGame: (
    params: CreateMobParams,
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
  viewedRound: (mobGameId: string) => void;
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
        createMobGame: (params, onCreated) => {
          socket.emit(MOB_EVENTS.CREATE_MOB_GAME, params, onCreated);
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
        viewedRound: mobGameId => {
          socket.emit(MOB_EVENTS.VIEWED_MOB_GAME_ROUND, mobGameId);
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
