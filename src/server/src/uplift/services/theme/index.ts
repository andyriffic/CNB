import { MultiLingualText } from '../../types';
import { GAME_MOVE } from '../game-result/types';

export type ThemedMove = {
  name: MultiLingualText;
  winsBy: MultiLingualText;
  imageUrl: string;
};

export type GameTheme = {
  name: MultiLingualText;
  moves: { [moveKey: string]: ThemedMove };
  style: {
    featureBackgroundColor: string;
    featureTextColor: string;
    pageBackgroundColor: string;
    primaryTextColor: string;
    primaryBorderColor: string;
  };
  sounds: {
    musicUrl: string;
  };
};

export const THEMES: { [themeId: string]: GameTheme } = {
  cnb: {
    name: { english: 'Cowboy, Ninja, Bear', chinese: '牛仔，忍者，熊' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Ninja', chinese: '忍者' },
        winsBy: { english: 'slices', chinese: '片' },
        imageUrl: '/theme/cnb/ninja.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Cowboy', chinese: '牛仔' },
        winsBy: { english: 'shoots', chinese: '芽' },
        imageUrl: '/theme/cnb/cowboy.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Bear', chinese: '熊' },
        winsBy: { english: 'eats', chinese: '吃' },
        imageUrl: '/theme/cnb/bear.png',
      },
    },
    style: {
      featureBackgroundColor: '#E36E65',
      featureTextColor: '#1A414D',
      pageBackgroundColor: '#F8F8FF',
      primaryTextColor: '#1A414D',
      primaryBorderColor: '#000',
    },
    sounds: {
      musicUrl: '/theme/cnb/theme-music.mp3',
    },
  },
  'rock-paper-scissors': {
    name: { english: 'Rock, Paper, Scissors', chinese: '岩石,紙,剪刀' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Paper', chinese: '紙' },
        winsBy: { english: 'wraps', chinese: '包裝' },
        imageUrl: '/theme/rock-paper-scissors/paper.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Rock', chinese: '岩石' },
        winsBy: { english: 'blunts', chinese: '成風' },
        imageUrl: '/theme/rock-paper-scissors/rock.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Scissors', chinese: '剪刀' },
        winsBy: { english: 'cuts', chinese: '削減' },
        imageUrl: '/theme/rock-paper-scissors/scissors.png',
      },
    },
    style: {
      featureBackgroundColor: '#807c7e',
      featureTextColor: '#000',
      pageBackgroundColor: '#f4f6f5',
      primaryTextColor: '#000',
      primaryBorderColor: '#000',
    },
    sounds: {
      musicUrl: '/theme/cnb/theme-music.mp3',
    },
  },
  'summer-winter': {
    name: { english: 'Summer/Winter Tournament', chinese: '夏季/冬季 比賽' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Sun', chinese: '太陽' },
        winsBy: { english: 'melts', chinese: '熔體' },
        imageUrl: '/theme/summer-winter/sun.gif',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Snow', chinese: '雪' },
        winsBy: { english: 'freezes', chinese: '凍結' },
        imageUrl: '/theme/summer-winter/snow.gif',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Pool', chinese: '池' },
        winsBy: { english: 'cools', chinese: '冷卻' },
        imageUrl: '/theme/summer-winter/pool.gif',
      },
    },
    style: {
      featureBackgroundColor: '#e1a959',
      featureTextColor: '#1A414D',
      pageBackgroundColor: '#F8F8FF',
      primaryTextColor: '#1A414D',
      primaryBorderColor: '#000',
    },
    sounds: {
      musicUrl: '/theme/cnb/theme-music.mp3',
    },
  },
};
