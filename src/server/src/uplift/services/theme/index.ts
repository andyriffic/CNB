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
  },
  ['chinese-new-year-2020']: {
    name: { english: 'Chinese New Year 2020', chinese: '牛仔，忍者，熊' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Nian', chinese: '年兽' },
        winsBy: { english: 'eats', chinese: '吃' },
        imageUrl: '/theme/chinese-new-year-2020/nian.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'human', chinese: '人类' },
        winsBy: { english: 'ignite', chinese: '点火' },
        imageUrl: '/theme/chinese-new-year-2020/human.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'firecrackers', chinese: '爆竹' },
        winsBy: { english: 'frighten', chinese: '吓走' },
        imageUrl: '/theme/chinese-new-year-2020/firecrackers.png',
      },
    },
  },
  halloween: {
    name: { english: 'Halloween', chinese: '萬聖節' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Zombie', chinese: '' },
        winsBy: { english: 'eats brains', chinese: '' },
        imageUrl: '/theme/halloween/zombie.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Witch', chinese: '' },
        winsBy: { english: 'curses', chinese: '' },
        imageUrl: '/theme/halloween/witch.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Werewolf', chinese: '' },
        winsBy: { english: 'mauls', chinese: '' },
        imageUrl: '/theme/halloween/werewolf.png',
      },
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
  },
  'summer-winter': {
    name: {
      english: 'Summer/Winter Tournament (beta*)',
      chinese: '夏季/冬季 比賽',
    },
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
  },
  yixing: {
    name: {
      english: 'Yixing',
      chinese: '',
    },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Yixing Eating', chinese: '宜興飲食' },
        winsBy: { english: 'beats', chinese: '節拍' },
        imageUrl: '/theme/yixing/eating.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Yixing Drinking', chinese: '宜興飲酒' },
        winsBy: { english: 'beats', chinese: '節拍' },
        imageUrl: '/theme/yixing/drinking.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Yixing Sleeping', chinese: '宜興睡覺' },
        winsBy: { english: 'beats', chinese: '節拍' },
        imageUrl: '/theme/yixing/sleeping.png',
      },
    },
  },
  cnbop: {
    name: { english: 'Cowboy, Ninja, Bear, Octopus, Pirate', chinese: '' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Ninja', chinese: '忍者' },
        winsBy: { english: 'slices', chinese: '片' },
        imageUrl: '/theme/cnb/ninja.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Cowboy', chinese: '牛仔' },
        winsBy: { english: 'shoots', chinese: '芽' },
        imageUrl: '/theme/cnbop/cowboy.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Bear', chinese: '熊' },
        winsBy: { english: 'eats', chinese: '吃' },
        imageUrl: '/theme/cnb/bear.png',
      },
      [GAME_MOVE.D]: {
        name: { english: 'Octopus', chinese: '章魚' },
        winsBy: { english: 'strangles', chinese: '芽' },
        imageUrl: '/theme/cnbop/octopus.png',
      },
      [GAME_MOVE.E]: {
        name: { english: 'Pirate', chinese: '海盜' },
        winsBy: { english: 'plunders', chinese: '吃' },
        imageUrl: '/theme/cnbop/pirate.png',
      },
    },
  },
  ['jungle-snakes-and-ladders']: {
    name: { english: 'Snakes and Ladders', chinese: '牛仔，忍者，熊' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'monkey', chinese: '年兽' },
        winsBy: { english: 'strangles', chinese: '吃' },
        imageUrl: '/theme/jungle-snakes-and-ladders/monkey.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'sloth', chinese: '人类' },
        winsBy: { english: 'claws', chinese: '点火' },
        imageUrl: '/theme/jungle-snakes-and-ladders/sloth.gif',
      },
      [GAME_MOVE.C]: {
        name: { english: 'tiger', chinese: '爆竹' },
        winsBy: { english: 'bites', chinese: '吓走' },
        imageUrl: '/theme/jungle-snakes-and-ladders/tiger.gif',
      },
    },
  },
  ['goodbye-mb']: {
    name: { english: 'Goodbye Michael', chinese: '' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'IE11', chinese: '' },
        winsBy: { english: 'beats', chinese: '' },
        imageUrl: '/theme/goodbye-mb/ie11.png',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Javascript', chinese: '' },
        winsBy: { english: 'beats', chinese: '' },
        imageUrl: '/theme/goodbye-mb/javascript.png',
      },
      [GAME_MOVE.C]: {
        name: { english: 'iframes', chinese: '' },
        winsBy: { english: 'beats', chinese: '' },
        imageUrl: '/theme/goodbye-mb/iframes.jpg',
      },
    },
  },
  ['covid-19']: {
    name: { english: 'COVID-19', chinese: '' },
    moves: {
      [GAME_MOVE.A]: {
        name: { english: 'Toilet Paper', chinese: '' },
        winsBy: { english: 'more valuable than', chinese: '' },
        imageUrl: '/theme/covid-19/toilet-paper.gif',
      },
      [GAME_MOVE.B]: {
        name: { english: 'Hand Sanitiser', chinese: '' },
        winsBy: { english: 'kills', chinese: '' },
        imageUrl: '/theme/covid-19/hand-sanitiser.gif',
      },
      [GAME_MOVE.C]: {
        name: { english: 'Coronavirus', chinese: '' },
        winsBy: { english: 'depletes stocks of', chinese: '' },
        imageUrl: '/theme/covid-19/virus.gif',
      },
    },
  },
};
