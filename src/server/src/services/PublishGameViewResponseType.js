// @flow
import type { GameStatus } from '../types/GameStatusType';
import type { GameResult } from '../types/GameResultType';
import type { PlayerAvatar } from '../types/PlayerType';

export type PlayerView = {
  connected: boolean,
  name?: string,
  moved: boolean,
  move?: string,
  avatar: PlayerAvatar
}

export type GameView = {
  player1: PlayerView,
  player2: PlayerView,
  status: GameStatus,
  result?: ?GameResult,
}

export type PublishGameViewResponse = {
  type: string,
  payload?: GameView,
  recipients?: {
    all: boolean,
  }
};
