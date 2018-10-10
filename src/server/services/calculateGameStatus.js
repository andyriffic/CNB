// @flow
import type { CalculateGameStatusResponse, GameStatus, PlayerStatus } from './CalculateGameStatusResponseType';
import { outgoingMessageTypes } from '../messages/typeConstants';
import type { Game } from '../types/GameType';
import type { Player } from '../types/PlayerType';

import runGame from './runGame';

const playerStatusFromPlayer = (player: Player): PlayerStatus => {
  return {
    connected: !(!player.name),
    name: player.name,
    moved: !(!player.move),
  };
};

const gameStatusFromGame = (game: Game): GameStatus => {
  return {
    player1: playerStatusFromPlayer(game.player1),
    player2: playerStatusFromPlayer(game.player2),
    gameResult: runGame(game),
  };
};

const calculateGameStatus = (gameStatus: Game): CalculateGameStatusResponse => {
  return {
    type: outgoingMessageTypes.GAME_STATUS,
    payload: gameStatusFromGame(gameStatus),
    recipients: {
      all: true,
    },
  };
};

export default calculateGameStatus;
