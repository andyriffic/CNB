import { PlayerList } from './types';

const ALL_PLAYERS: PlayerList = [
  { name: 'Albert', id: 'albert' },
  { name: 'Alex', id: 'alex' },
  { name: 'Andy', id: 'andy' },
  { name: 'Azra', id: 'azra' },
  { name: 'Bin', id: 'bin' },
  { name: 'Bjorn', id: 'bjorn' },
  { name: 'Chris', id: 'chris' },
  { name: 'Du', id: 'du' },
  { name: 'Duyen', id: 'duyen' },
  { name: 'Jatin', id: 'jatin' },
  { name: 'Jay', id: 'jay' },
  { name: 'Jim', id: 'jim' },
  { name: 'Liujing', id: 'liujing' },
  { name: 'Marion', id: 'marion' },
  { name: 'Michael B', id: 'michael_b' },
  { name: 'Michael W', id: 'michael_w' },
  { name: 'Stacey', id: 'stacey' },
  { name: 'Ray', id: 'ray' },
  { name: 'Shuming', id: 'shuming' },
  { name: 'Yingjian', id: 'yingjian' },
  { name: 'Yixing', id: 'yixing' },
  { name: 'Yujin', id: 'yujin' },
];

const getPlayersAsync = (): Promise<PlayerList> => {
  return Promise.resolve(ALL_PLAYERS);
};

export default {
  getPlayersAsync,
};
