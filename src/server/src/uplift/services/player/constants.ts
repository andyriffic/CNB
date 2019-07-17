import { PlayerList } from './types';

export const ALL_PLAYERS: PlayerList = [
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
  { name: 'Stacey', id: 'stacey' },
  { name: 'Ray', id: 'ray' },
  { name: 'Shuming', id: 'shuming' },
  { name: 'Yingjian', id: 'yingjian' },
  { name: 'Yixing', id: 'yixing' },
  { name: 'Yujin', id: 'yujin' },
];

export const ALL_TEAMS = [
  { id: 'xian', name: 'Xian' },
  { id: 'melb', name: 'Melbourne' },
];

export const PLAYER_IDS_BY_TEAM: { [teamId: string]: string[] } = {
  xian: ['bin', 'shuming', 'yingjian', 'yixing'],
  melb: [
    'albert',
    'alex',
    'andy',
    'azra',
    'bjorn',
    'chris',
    'du',
    'duyen',
    'jatin',
    'jay',
    'jim',
    'liujing',
    'marion',
    'michael_b',
    'stacey',
    'ray',
    'yujin',
  ],
};
