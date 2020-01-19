import { PlayerList, Team } from './types';

const tournamentTag = 'tournament';
const retired = 'retired';

export const ALL_PLAYERS: PlayerList = [
  {
    name: 'Albert',
    id: 'albert',
    avatarImageUrl: '/players/albert.png',
    tags: [tournamentTag],
  },
  {
    name: 'Alex',
    id: 'alex',
    avatarImageUrl: '/players/alex.png',
    tags: [tournamentTag],
  },
  {
    name: 'Andy',
    id: 'andy',
    avatarImageUrl: '/players/andy.png',
    tags: [tournamentTag],
  },
  {
    name: 'Azra',
    id: 'azra',
    avatarImageUrl: '/players/azra.png',
    tags: [tournamentTag],
  },
  {
    name: 'Bec',
    id: 'bec',
    avatarImageUrl: '/players/bec.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Bin',
    id: 'bin',
    avatarImageUrl: '/players/bin.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Bjorn',
    id: 'bjorn',
    avatarImageUrl: '/players/bjorn.png',
    tags: [retired],
  },
  {
    name: 'Chris',
    id: 'chris',
    avatarImageUrl: '/players/chris.png',
    tags: [tournamentTag],
  },
  {
    name: 'Du',
    id: 'du',
    avatarImageUrl: '/players/du.png',
    tags: [tournamentTag],
  },
  {
    name: 'Dunny',
    id: 'dunny',
    avatarImageUrl: '/players/dunny.png',
    tags: [tournamentTag],
  },
  {
    name: 'Duyen',
    id: 'duyen',
    avatarImageUrl: '/players/duyen.png',
    tags: [tournamentTag],
  },
  {
    name: 'Jatin',
    id: 'jatin',
    avatarImageUrl: '/players/jatin.png',
    tags: [retired],
  },
  {
    name: 'Jay',
    id: 'jay',
    avatarImageUrl: '/players/jay.png',
    tags: [tournamentTag],
  },
  {
    name: 'Jim',
    id: 'jim',
    avatarImageUrl: '/players/jim.png',
    tags: [tournamentTag],
  },
  {
    name: 'Liujing',
    id: 'liujing',
    avatarImageUrl: '/players/liujing.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Ma Hong',
    id: 'ma_hong',
    avatarImageUrl: '/players/ma_hong.png',
    tags: [],
  },
  {
    name: 'Marion',
    id: 'marion',
    avatarImageUrl: '/players/marion.png',
    tags: [tournamentTag],
  },
  {
    name: 'Michael B',
    id: 'michael_b',
    avatarImageUrl: '/players/michael_b.png',
    tags: [tournamentTag],
  },
  {
    name: 'Stacey',
    id: 'stacey',
    avatarImageUrl: '/players/stacey.png',
    tags: [tournamentTag],
  },
  {
    name: 'Ray',
    id: 'ray',
    avatarImageUrl: '/players/ray.png',
    tags: [retired],
  },
  {
    name: 'Ricky',
    id: 'ricky',
    avatarImageUrl: '/players/ricky.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Shuming',
    id: 'shuming',
    avatarImageUrl: '/players/shuming.png',
    tags: [tournamentTag],
  },
  {
    name: 'Sime',
    id: 'sime',
    avatarImageUrl: '/players/sime.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Yingjian',
    id: 'yingjian',
    avatarImageUrl: '/players/yingjian.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Yixing',
    id: 'yixing',
    avatarImageUrl: '/players/yixing.png',
    tags: [tournamentTag, retired],
  },
  {
    name: 'Yujin',
    id: 'yujin',
    avatarImageUrl: '/players/yujin.png',
    tags: [tournamentTag, retired],
  },
];

export const ALL_TEAMS: Team[] = [];

export const PLAYER_IDS_BY_TEAM: { [teamId: string]: string[] } = {};
