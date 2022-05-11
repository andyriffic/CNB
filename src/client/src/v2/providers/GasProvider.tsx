import React, { useState, useEffect, ReactNode } from 'react';
import { createSocket } from '../services/sockets';
import { Player } from './PlayersProvider';

enum GAS_EVENTS {
  REQUEST_GAS_GAMES = 'REQUEST_GAS_GAMES',
  GAS_GAMES_UPDATE = 'GAS_GAMES_UPDATE',
  CREATE_GAS_GAME = 'CREATE_GAS_GAME',
  PLAY_GAS_CARD = 'PLAY_GAS_CARD',
  PRESS_GAS = 'PRESS_GAS',
  NEXT_GAS_PAYER = 'NEXT_GAS_PAYER',
  GUESS_NEXT_PLAYER_OUT = 'GUESS_NEXT_PLAYER_OUT',
  PLAYER_TIMED_OUT = 'PLAYER_TIMED_OUT',
  PLAY_EFFECT = 'PLAY_EFFECT',
}

export type GasGameDirection = 'left' | 'right';

export type GasGame = {
  id: string;
  allPlayers: GasPlayer[];
  alivePlayersIds: string[];
  deadPlayerIds: string[];
  winningPlayerId?: string;
  direction: GasGameDirection;
  currentPlayer: {
    id: string;
    cardPlayed?: GasCard;
    pressesRemaining: number;
  };
  gasCloud: GasCloud;
  pointsMap: number[];
  globalEffect?: GlobalEffect;
};

export type GasCloud = {
  pressed: number;
  exploded: boolean;
};

export type GasPlayer = {
  player: Player;
  status: 'alive' | 'dead' | 'winner';
  cards: GasCard[];
  effectPower?: EffectType;
  finishedPosition?: number;
  points: number;
  totalPresses: number;
  timedOut: boolean;
  guesses: {
    nextPlayerOutGuess?: string;
    nominatedCount: number;
    correctGuessCount: number;
  };
};

export type EffectType = 'double';

export type GlobalEffect = {
  type: EffectType;
  playedByPlayerId: string;
};

export type GasCard = {
  type: 'press' | 'skip' | 'reverse';
  presses: number;
};

type CreateGasGameParams = {
  players: Player[];
};

export type GasService = {
  gasGames?: GasGame[];
  createGasGame: (
    params: CreateGasGameParams,
    onCreated: (id: string) => void
  ) => void;
  playCard: (gameId: string, playerId: string, cardIndex: number) => void;
  pressGas: (gameId: string) => void;
  nextPlayer: (gameId: string) => void;
  timeoutPlayer: (gameId: string, playerId: string) => void;
  playEffect: (gameId: string, effect: GlobalEffect) => void;
  guessNextOutPlayer: (
    gameId: string,
    playerId: string,
    guessPlayerId: string
  ) => void;
};

const GasContext = React.createContext<GasService | undefined>(undefined);

const socket = createSocket('gas-out');

export const GasProvider = ({ children }: { children: ReactNode }) => {
  const [gasGames, setGasGames] = useState<GasGame[]>([]);

  useEffect(() => {
    socket.on(GAS_EVENTS.GAS_GAMES_UPDATE, (mobGames: GasGame[]) => {
      console.log('GAS GAMES', mobGames);
      setGasGames(mobGames);
    });
    socket.emit(GAS_EVENTS.REQUEST_GAS_GAMES);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <GasContext.Provider
      value={{
        gasGames,
        createGasGame: (params, onCreated) => {
          socket.emit(GAS_EVENTS.CREATE_GAS_GAME, params, onCreated);
        },
        playCard: (gameId, playerId, cardIndex) => {
          socket.emit(GAS_EVENTS.PLAY_GAS_CARD, gameId, playerId, cardIndex);
        },
        pressGas: gameId => {
          socket.emit(GAS_EVENTS.PRESS_GAS, gameId);
        },
        nextPlayer: gameId => {
          socket.emit(GAS_EVENTS.NEXT_GAS_PAYER, gameId);
        },
        timeoutPlayer: (gameId, playerId) => {
          socket.emit(GAS_EVENTS.PLAYER_TIMED_OUT, gameId, playerId);
        },
        playEffect: (gameId, effect) => {
          socket.emit(GAS_EVENTS.PLAY_EFFECT, gameId, effect);
        },
        guessNextOutPlayer: (gameId, playerId, guessPlayerId) => {
          socket.emit(
            GAS_EVENTS.GUESS_NEXT_PLAYER_OUT,
            gameId,
            playerId,
            guessPlayerId
          );
        },
      }}
    >
      {children}
    </GasContext.Provider>
  );
};

export function useGasProvider() {
  const context = React.useContext(GasContext);
  if (context === undefined) {
    throw new Error('useMobProvider must be used within a MobProvider');
  }
  return context;
}
