import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../uplift/utils/player';
import { createSocket } from '../services/sockets';

enum PLAYER_EVENTS {
  SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS',
  ON_PLAYERS_RECEIVED = 'ALL_PLAYERS_UPDATE',
  ADD_PLAYER = 'ADD_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  SAFE_UPDATE_PLAYER = 'SAFE_UPDATE_PLAYER',
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
  safeUpdatePlayerStringAttribute: (
    id: string,
    attributeName: string,
    attributeValue: string,
    onUpdated?: () => void
  ) => void;
  triggerUpdate: () => void;
  giveSnakesAndLaddersMoves: (
    playerId: string,
    numMoves: number,
    onUpdated?: () => void
  ) => void;
  giveAllPlayersSnakesAndLaddersMoves: (
    numMoves: number,
    onUpdated?: () => void
  ) => void;
  setNextFinishedPlacing: (playerId: string, placingKey: string) => void;
};

const PlayersContext = React.createContext<PlayerService | undefined>(
  undefined
);

const socket = createSocket('players-realz');

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.on(PLAYER_EVENTS.ON_PLAYERS_RECEIVED, (players: Player[]) => {
      console.log('Players', players);
      setAllPlayers(players);
      setLoadingPlayers(false);
    });
    console.log(
      'PlayersProvider',
      PLAYER_EVENTS.SUBSCRIBE_TO_ALL_PLAYERS,
      `${SOCKETS_ENDPOINT}/players-realz`
    );
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
        safeUpdatePlayerStringAttribute: (
          id,
          attributeName,
          attributeValue,
          onUpdated
        ) => {
          socket.emit(
            PLAYER_EVENTS.SAFE_UPDATE_PLAYER,
            id,
            attributeName,
            attributeValue,
            onUpdated
          );
        },
        triggerUpdate: () => {
          socket.emit(PLAYER_EVENTS.TRIGGER_UPDATE);
        },
        giveSnakesAndLaddersMoves: (id, numMoves, onUpdated) => {
          const player = allPlayers.find(p => p.id === id);
          if (!player) {
            return;
          }

          if (numMoves === 0) {
            onUpdated && onUpdated();
            return;
          }

          const updatedTags = [
            ...player.tags.filter(t => !t.startsWith('sl_moves')),
            `sl_moves:${parseInt(
              getPlayerAttributeValue(player.tags, 'sl_moves', '0')
            ) + numMoves}`,
          ];

          socket.emit(PLAYER_EVENTS.UPDATE_PLAYER, id, updatedTags, onUpdated);
        },
        giveAllPlayersSnakesAndLaddersMoves: (numMoves, onUpdated) => {
          const eligiblePlayers = allPlayers.filter(p =>
            p.tags.includes('sl_participant')
          );

          eligiblePlayers.forEach(p => {
            const updatedTags = [
              ...p.tags.filter(t => !t.startsWith('sl_moves')),
              `sl_moves:${parseInt(
                getPlayerAttributeValue(p.tags, 'sl_moves', '0')
              ) + numMoves}`,
            ];

            socket.emit(PLAYER_EVENTS.UPDATE_PLAYER, p.id, updatedTags);
          });
          onUpdated && onUpdated();
        },
        setNextFinishedPlacing: (playerId, placingKey) => {
          const player = allPlayers.find(p => p.id === playerId);
          if (!player) {
            return;
          }
          const currentPlacing = getPlayerIntegerAttributeValue(
            player.tags,
            placingKey,
            0
          );
          if (currentPlacing > 0) {
            return;
          }

          const topPlacing = Math.max(
            ...allPlayers.map(p =>
              getPlayerIntegerAttributeValue(p.tags, placingKey, 0)
            )
          );

          const updatedTags = [
            ...player.tags.filter(t => !t.startsWith(placingKey)),
            `${placingKey}:${topPlacing + 1}`,
          ];
          socket.emit(PLAYER_EVENTS.UPDATE_PLAYER, playerId, updatedTags);
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
