import { MultiLingualText } from '../../types';
import { GAME_MOVE } from '../game-result/types';

export type ThemedMove = {
  name: MultiLingualText;
  imageUrl: string;
};

export type GameTheme = {
  name: MultiLingualText;
  moves: { [moveKey: string]: ThemedMove };
  style: {
    featureBackgroundColor: string;
    featureTextColor: string;
    primaryPageBackgroundColor: string;
    secondaryPageBackgroundColor: string;
    primaryTextColor: string;
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
        imageUrl: '/theme/cnb/ninja.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Cowboy', chinese: '牛仔' },
        imageUrl: '/theme/cnb/cowboy.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Bear', chinese: '熊' },
        imageUrl: '/theme/cnb/bear.png',
      },
    },
    style: {
      featureBackgroundColor: '#E36E65',
      featureTextColor: '#1A414D',
      primaryPageBackgroundColor: '#95C0AB',
      secondaryPageBackgroundColor: '#95C0AB',
      primaryTextColor: '#1A414D',
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
        imageUrl: '/theme/rock-paper-scissors/paper.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Rock', chinese: '岩石' },
        imageUrl: '/theme/rock-paper-scissors/rock.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Scissors', chinese: '剪刀' },
        imageUrl: '/theme/rock-paper-scissors/scissors.png',
      },
    },
    style: {
      featureBackgroundColor: '#807c7e',
      featureTextColor: '#000',
      primaryPageBackgroundColor: '#f4f6f5',
      secondaryPageBackgroundColor: '#aba6a8',
      primaryTextColor: '#000',
    },
    sounds: {
      musicUrl: '/theme/cnb/theme-music.mp3',
    },
  },
};
