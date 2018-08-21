// @flow
import type { Message } from './MessageType';
import { outgoingMessageTypes } from './typeConstants';
import type { Game } from '../types/GameType';
import type { Player } from '../types/PlayerType';

const playerState = (player: Player) => {
  return {
    connected: !(!player.name),
    name: player.name,
    moved: !(!player.move),
  };
};

const gameStatusFromState = (state: Game) => {
  return {
    player1: playerState(state.player1),
    player2: playerState(state.player2),
  };
};

const gameStatusMessage = (gameStatus: Game): Message => {
  return {
    type: outgoingMessageTypes.GAME_STATUS,
    payload: gameStatusFromState(gameStatus),
    recipients: {
      all: true,
    },
  };
};

export default gameStatusMessage;
