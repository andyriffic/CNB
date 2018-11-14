// @flow
import type { GameStatus } from '../types/GameStatusType';

export type PlayerView = {
  connected: boolean,
  name?: string,
  moved: boolean,
  move?: string,
}

export type GameOutcome = "Pending" | "Draw" | "Player1" | "Player2";

export type GameResult = {
  player1Move?: string,
  player2Move?: string,
  outcome: GameOutcome,
};

export type GameView = {
  player1: PlayerView,
  player2: PlayerView,
  status: GameStatus,
}

export type PublishGameViewResponse = {
  type: string,
  payload?: GameView,
  recipients?: {
    all: boolean,
  }
};
