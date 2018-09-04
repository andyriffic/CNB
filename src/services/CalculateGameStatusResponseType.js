// @flow

export type PlayerStatus = {
  connected: boolean,
  name?: string,
  moved: boolean,
}

export type GameResult = {
  player1Move?: string,
  player2Move?: string,
  result: string,
};

export type GameStatus = {
  player1: PlayerStatus,
  player2: PlayerStatus,
  gameResult: GameResult,
}

export type CalculateGameStatusResponse = {
  type: string,
  payload?: GameStatus,
  recipients?: {
    all: boolean,
  }
};
