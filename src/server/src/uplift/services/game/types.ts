export enum GAME_STATUS {
  WaitingPlayerMoves = 0,
  ReadyToPlay = 1,
  Finished = 2,
}

export type TeamMatchup = {
  id: string;
  teamIds: [string, string];
  // TODO: trophy points goal?
};

export type GameMove = {
  teamId: string,
  playerId?: string;
  moveId?: string;
  powerUpId?: string;
};

export type GameMoveUpdate = {
  playerId?: string;
  moveId?: string;
  powerUpId?: string;
}

export type GameResult = {
  winnerPlayerId: string;
  draw: boolean;
};

export type Game = {
  id: string;
  moves: [GameMove, GameMove];
  gameResult?: GameResult;
};
