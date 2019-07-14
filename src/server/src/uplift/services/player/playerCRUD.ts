import { PlayerList } from './types';
import { ALL_PLAYERS } from './constants';

const getPlayersAsync = (): Promise<PlayerList> => {
  return Promise.resolve(ALL_PLAYERS);
};

export default {
  getPlayersAsync,
};
