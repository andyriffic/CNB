import { GAME_MOVE, GameResult } from '../game-result/types';

export enum GAME_STATUS {
  WaitingPlayerMoves = 'WaitingPlayerMoves',
  ReadyToPlay = 'ReadyToPlay',
  Finished = 'Finished',
}

export enum PLAY_MODE {
  Standard = 'Standard',
  Timebomb = 'Timebomb',
  TugoWar = 'Tug-o-war',
  SuperSuprise = 'Super-suprise',
}

export type TeamMatchup = {
  id: string;
  teamIds: [string, string];
  pointCounterIds: [string, string];
  trophyCounterIds: [string, string];
  bonusCounterId: string;
  trophyGoal: number;
  themeId: string;
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
  trophyWon: boolean;
  trophyReset: boolean;
  viewed: boolean;
  playMode: PLAY_MODE;
  gameAttributes: { [key: string]: any };
};

export type TeamSpectatorView = {
  id: string;
  name: string;
  points: number;
  trophies: number;
  playerNames: string[];
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
  playerId: string | null;
  playerAvatarUrl: string | null;
  tags: string[] | null;
};

export type GameSpectatorView = {
  id: string;
  status: GAME_STATUS;
  moves: [MoveSpectatorView, MoveSpectatorView];
  result?: GameResultSpectatorView;
  trophyWon: boolean;
  trophyReset: boolean;
  viewed: boolean;
  playMode: string;
  attributes: { [key: string]: any };
};

export type MatchupSpectatorView = {
  id: string;
  gameInProgress: GameSpectatorView | null;
  teams: [TeamSpectatorView, TeamSpectatorView];
  trophyGoal: number;
  bonusPoints: number;
  themeId: string;
};

export type MatchupPlayerView = {
  playerTeamId: string;
} & MatchupSpectatorView;
