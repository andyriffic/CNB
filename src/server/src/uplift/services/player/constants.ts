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
    tags: [tournamentTag],
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
    tags: [tournamentTag, retired],
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
    tags: [tournamentTag],
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

export const ALL_TEAMS: Team[] = [
  { id: 'test_01', name: 'Test Team One', tags: [] },
  { id: 'test_02', name: 'Test Team Two', tags: [] },
  { id: 'tournament_team_01', name: 'Fatboy Slim', tags: [tournamentTag] },
  { id: 'tournament_team_02', name: 'Groot Force', tags: [tournamentTag] },
  { id: 'tournament_team_03', name: 'The A Team', tags: [tournamentTag] },
  { id: 'tournament_team_04', name: 'Highway to Hell', tags: [tournamentTag] },
  { id: 'tournament_team_05', name: 'Bake My Day', tags: [tournamentTag] },
  { id: 'tournament_team_06', name: 'Night Fury', tags: [tournamentTag] },
  { id: 'tournament_team_07', name: 'Dropping Bombs', tags: [tournamentTag] },
  {
    id: 'tournament_team_08',
    name: 'Cowboy Needs a Beer',
    tags: [tournamentTag],
  },
  { id: 'tournament_team_09', name: 'Team Trouble', tags: [tournamentTag] },
  { id: 'tournament_team_10', name: 'Chilly Bin', tags: [tournamentTag] },
  { id: 'tournament_team_11', name: 'Go Duck', tags: [tournamentTag] },
  { id: 'yixing', name: 'Yixing', tags: [] },
  { id: 'not_yixing', name: 'Not Yixing', tags: [] },
];

export const PLAYER_IDS_BY_TEAM: { [teamId: string]: string[] } = {
  test_01: ['albert', 'alex', 'andy'],
  test_02: ['yujin', 'yixing', 'yingjian'],
  tournament_team_01: ['jay', 'bec'],
  tournament_team_02: ['marion', 'dunny'],
  tournament_team_03: ['albert', 'andy'],
  tournament_team_04: ['du', 'ricky'],
  tournament_team_05: ['yujin', 'michael_b'],
  tournament_team_06: ['liujing', 'sime'],
  tournament_team_07: ['shuming', 'azra'],
  tournament_team_08: ['chris', 'alex'],
  tournament_team_09: ['jim', 'yingjian'],
  tournament_team_10: ['bin', 'stacey'],
  tournament_team_11: ['yixing', 'duyen'],
  yixing: ['yixing'],
  not_yixing: ALL_PLAYERS.filter(p => p.id !== 'yixing').map(p => p.id),
};
