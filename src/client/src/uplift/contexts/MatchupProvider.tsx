import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { isFeatureEnabled } from '../../featureToggle';

enum MATCHUP_EVENTS {
  SUBSCRIBE_TO_ALL_MATCHUPS = 'SUBSCRIBE_TO_ALL_MATCHUPS',
  ON_MATCHUPS_RECEIVED = 'ALL_MATCHUPS_UPDATE',
  SUBSCRIBE_TO_MATCHUP = 'SUBSCRIBE_TO_MATCHUP',
  ON_MATCHUP_UPDATED = 'ON_MATCHUP_UPDATED',
  START_GAME_FOR_MATCHUP = 'START_GAME_FOR_MATCHUP',
  MAVE_MOVE_FOR_MATCHUP = 'MAVE_MOVE_FOR_MATCHUP',
  SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER = 'SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER',
  MATCHUPS_FOR_PLAYER_UPDATE = 'MATCHUPS_FOR_PLAYER_UPDATE',
  MAKE_MOVE = 'MAVE_MOVE_FOR_MATCHUP',
  PLAY_GAME_FOR_MATCHUP = 'PLAY_GAME_FOR_MATCHUP',
  SET_GAME_VIEWED = 'SET_GAME_VIEWED',
  ADD_INSTANT_MATCHUP = 'ADD_INSTANT_MATCHUP',
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
  trophies: number;
  playerNames: string[];
  tags: string[];
};

export type SpectatorMove = {
  moved: boolean;
  usedPowerup: boolean;
  playerName: string | null;
  playerAvatarUrl: string | null;
};

export type GameMoveResult = {
  moveId: string;
};

export type GameResult = {
  draw?: boolean;
  winnerIndex?: number;
  moves: [GameMoveResult, GameMoveResult];
};

export type Game = {
  id: string;
  status: GAME_STATUS;
  moves: [SpectatorMove, SpectatorMove];
  result?: GameResult;
  trophyWon: boolean;
  trophyReset: boolean;
  viewed: boolean;
  playMode: string;
  attributes: { [key: string]: any };
};

export type Matchup = {
  id: string;
  teams: [Team, Team];
  gameInProgress?: Game;
  trophyGoal: number;
  themeId: string;
};

export type MatchupForPlayer = {
  playerTeamId: string;
} & Matchup;

export type GameMoveUpdate = {
  playerId?: string;
  moveId?: string;
  powerUpId?: string;
};

export type MatchupService = {
  loadingAllMatchups: boolean;
  allMatchups: Matchup[];
  subscribeToMatchup: (matchupId: string) => void;
  currentMatchup?: Matchup;
  clearCurrentMatchup: () => void;
  startGameForMatchup: (
    matchupId: string,
    gameMode?: string,
    gameAttributes?: { [key: string]: any }
  ) => void;
  subscribeToMatchupsForPlayer: (playerId: string) => void;
  matchupsByPlayerId: { [playerId: string]: MatchupForPlayer[] };
  makeMove: (
    matchupId: string,
    teamId: string,
    gameMoveUpdate: GameMoveUpdate
  ) => void;
  playGameForMatchup: (matchupId: string) => void;
  setGameViewed: (matchupId: string) => void;
  addInstantMatchup: (
    player1Id: string,
    player2Id: string,
    trophyGoal: number,
    themeId: string,
    confirmation: (matchupId: string) => void
  ) => void;
};

const initialValue: MatchupService = {
  loadingAllMatchups: true,
  allMatchups: [],
  subscribeToMatchup: matchupId => {
    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_MATCHUP, matchupId);
  },
  clearCurrentMatchup: () => {},
  startGameForMatchup: (matchupId, gameMode = 'Standard', gameAttributes?) => {
    console.log('starting game for matchup', gameMode);
    socket.emit(
      MATCHUP_EVENTS.START_GAME_FOR_MATCHUP,
      matchupId,
      gameMode,
      gameAttributes
    );
  },
  subscribeToMatchupsForPlayer: playerId => {
    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_MATCHUPS_FOR_PLAYER, playerId);
  },
  matchupsByPlayerId: {},
  makeMove: (matchupId, teamId, gameMoveUpdate) => {
    socket.emit(MATCHUP_EVENTS.MAKE_MOVE, matchupId, teamId, gameMoveUpdate);
  },
  playGameForMatchup: matchupId => {
    socket.emit(MATCHUP_EVENTS.PLAY_GAME_FOR_MATCHUP, matchupId);
  },
  setGameViewed: matchupId => {
    socket.emit(MATCHUP_EVENTS.SET_GAME_VIEWED, matchupId);
  },
  addInstantMatchup: (
    player1Id,
    player2Id,
    trophyGoal,
    themeId,
    confirmation
  ) => {
    socket.emit(
      'ADD_INSTANT_MATCHUP',
      [player1Id, player2Id],
      trophyGoal,
      themeId,
      confirmation
    );
  },
};

const matchupsTestFilter = isFeatureEnabled('test')
  ? () => true
  : (matchup: Matchup) =>
      matchup.teams.some(team => !team.name.toLowerCase().startsWith('test'));

export const MatchupContext = React.createContext<MatchupService>(initialValue);

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/matchups-realz`);

export const MatchupProvider = ({ children }: { children: ReactNode }) => {
  const [loadingAllMatchups, setLoadingAllMatchups] = useState(
    initialValue.loadingAllMatchups
  );
  const [allMatchups, setAllMatchups] = useState<Matchup[]>(
    initialValue.allMatchups
  );

  const [currentMatchup, setCurrentMatchup] = useState<Matchup>();

  const [currentWatchingPlayerId, setCurrentWatchingPlayer] = useState('');
  const [matchupsByPlayerId, setMatchupsByPlayerId] = useState(
    initialValue.matchupsByPlayerId
  );

  useEffect(() => {
    socket.on(MATCHUP_EVENTS.ON_MATCHUPS_RECEIVED, (matchups: Matchup[]) => {
      setTimeout(() => {
        console.log('Matchups', matchups);
        setAllMatchups(matchups.filter(matchupsTestFilter));
        setLoadingAllMatchups(false);
      }, 1000);
    });

    socket.on(MATCHUP_EVENTS.ON_MATCHUP_UPDATED, (matchup: Matchup) => {
      console.log('Received Matchup', matchup);
      setCurrentMatchup(matchup);
    });

    socket.emit(MATCHUP_EVENTS.SUBSCRIBE_TO_ALL_MATCHUPS); // TODO: don't always emit this
  }, []);

  useEffect(() => {
    socket.on(
      MATCHUP_EVENTS.MATCHUPS_FOR_PLAYER_UPDATE,
      (matchupsForPlayer: { [playerId: string]: MatchupForPlayer[] }) => {
        console.log('Received Player Matchups', matchupsForPlayer);
        if (matchupsForPlayer[currentWatchingPlayerId]) {
          setMatchupsByPlayerId(matchupsForPlayer);
        }
      }
    );
  }, [currentWatchingPlayerId]);

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
        subscribeToMatchupsForPlayer: (playerId: string) => {
          setCurrentWatchingPlayer(playerId); // Not really sold on this pattern but just going with what works for now :/
          initialValue.subscribeToMatchupsForPlayer(playerId);
        },
        matchupsByPlayerId,
        makeMove: initialValue.makeMove,
        playGameForMatchup: initialValue.playGameForMatchup,
        setGameViewed: initialValue.setGameViewed,
        addInstantMatchup: initialValue.addInstantMatchup,
      }}
    >
      {children}
    </MatchupContext.Provider>
  );
};
