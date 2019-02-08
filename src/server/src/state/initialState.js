// @flow
import { GAME_STATUS } from './GameStatuses';
import type { Game } from '../types/GameType';

const initialState: Game = {
  player1: {
    name: 'XIAN',
  },
  player2: {
    name: 'MELB',
  },
  status: GAME_STATUS.EMPTY,
};

export default initialState;
