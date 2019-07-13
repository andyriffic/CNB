import { GAME_MOVE } from '../game-result/types';

export enum GAME_STATUS {
  WaitingPlayerMoves = 'WaitingPlayerMoves',
  ReadyToPlay = 'ReadyToPlay',
  Finished = 'Finished',
}

export type TeamMatchup = {
  id: string;
  teamIds: [string, string];
  pointCounterIds: [string, string];
  // TODO: trophy points goal + trophy counters?
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
};
