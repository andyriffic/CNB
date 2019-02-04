// @flow
import { GAME_STATUS } from './GameStatuses';
import type { Game } from '../types/GameType';

const initialState: Game = {
  player1: {
    name: 'NZ',
  },
  player2: {
    name: 'AUS',
  },
  status: GAME_STATUS.EMPTY,
};

export default initialState;
