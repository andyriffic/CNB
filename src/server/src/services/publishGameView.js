// @flow
import type { PublishGameViewResponse, GameView, PlayerView } from './PublishGameViewResponseType';
import { outgoingMessageTypes } from '../messages/typeConstants';
import type { Game } from '../types/GameType';
import type { Player } from '../types/PlayerType';

//import runGame from './runGame';

const playerStatusFromPlayer = (player: Player): PlayerView => {
  return {
    connected: !(!player.name),
    name: player.name,
    moved: !(!player.move),
    move: player.move,
    powerUp: player.powerUp,
    avatar: player.avatar,
  };
};

const gameViewFromGame = (game: Game): GameView => {
  return {
    player1: playerStatusFromPlayer(game.player1),
    player2: playerStatusFromPlayer(game.player2),
    status: game.status,
    result: game.result,
  };
};

const publishGameView = (gameStatus: Game): PublishGameViewResponse => {
  return {
    type: outgoingMessageTypes.GAME_VIEW,
    payload: gameViewFromGame(gameStatus),
    recipients: {
      all: true,
    },
  };
};

export default publishGameView;
