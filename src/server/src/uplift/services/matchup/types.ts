import { GAME_MOVE, GameResult } from '../game-result/types';

export enum GAME_STATUS {
  WaitingPlayerMoves = 'WaitingPlayerMoves',
  ReadyToPlay = 'ReadyToPlay',
  Finished = 'Finished',
}

export type TeamMatchup = {
  id: string;
  teamIds: [string, string];
  pointCounterIds: [string, string];
  trophyGoal: number;
  // TODO: bonus points counter
};

export type GameMove = {
  teamId: string;
  playerId?: string;
  moveId?: GAME_MOVE;
  powerUpId?: string;
};

export type GameMoveUpdate = {
  playerId?: string;
  moveId?: GAME_MOVE;
  powerUpId?: string;
};

export type Game = {
  id: string;
  moves: [GameMove, GameMove];
  result?: GameResult;
};

export type TeamSpectatorView = {
  id: string;
  name: string;
  points: number;
};

export type GameMoveResultSpectatorView = {
  moveId: GAME_MOVE;
  powerUpId: string;
};

export type GameResultSpectatorView = {
  draw?: boolean;
  winnerIndex?: number;
  moves: [GameMoveResultSpectatorView, GameMoveResultSpectatorView];
};

export type MoveSpectatorView = {
  moved: boolean;
  usedPowerup: boolean;
  playerName: string | null;
  playerAvatarUrl: string | null;
};

export type GameSpectatorView = {
  id: string;
  status: GAME_STATUS;
  moves: [MoveSpectatorView, MoveSpectatorView];
  result?: GameResultSpectatorView;
};

export type MatchupSpectatorView = {
  id: string;
  gameInProgress: GameSpectatorView | null;
  teams: [TeamSpectatorView, TeamSpectatorView];
  trophyGoal: number;
};

export type MatchupPlayerView = {
  playerTeamId: string;
} & MatchupSpectatorView;
