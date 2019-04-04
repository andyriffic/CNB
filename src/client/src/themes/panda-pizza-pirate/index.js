import {
  NinjaSelector,
  CowboySelector,
  BearSelector,
} from './components/select-move-symbols';
import PandaCharacter from './components/characters/panda';
import PizzaCharacter from './components/characters/pizza';
import PirateCharacter from './components/characters/pirate';

import themeMusic from './sounds/zazie.mp3';
import countdownBeep from './sounds/countdown-blip.wav';
import playerMoveSelected from '../../sounds/move-selected.wav';

import pandaWiningSound from './sounds/panda-win.mp3';
import pizzaWinningSound from './sounds/pizza-win.mp3';
import pirateWinningSound from './sounds/pirate-win.mp3';

import ResultScreen from '../../screens/spectator-screen/components/result';

export default {
  name: 'Pizza, Panda, Pirate',
  gameplay: {
    resultScreen: ResultScreen,
  },
  characters: {
    nameMapping: {
      A: 'Pizza 比薩',
      B: 'Panda 熊貓',
      C: 'Pirate 海盜',
    },
    selectMoveMapping: {
      A: NinjaSelector,
      B: CowboySelector,
      C: BearSelector,
    },
    characterMapping: {
      A: PizzaCharacter,
      B: PandaCharacter,
      C: PirateCharacter,
    },
    winningAnimationMapping: {
      A: null,
      B: null,
      C: null,
    },
    winningSoundMapping: {
      A: pizzaWinningSound,
      B: pandaWiningSound,
      C: pirateWinningSound,
    },
    likes: {
      A: ['Hot ovens 熱烤箱', 'Clogging arteries 堵塞動脈'],
      B: ['Rainbows 彩虹', 'Pirate killing 海盜殺戮'],
      C: ['Rum 朗姆酒', 'Cheesy treasure 俗氣的寶貝'],
    },
    dislikes: {
      A: ['Stomach acid 胃酸', 'Hungry pirates 飢餓的海盜'],
      B: ['Pizza nights 比薩之夜', 'Heart attacks 心髒病'],
      C: ['Cute animals 可愛的動物', 'Disembowelment 剖腹'],
    },
    winningPhrases: {
      A: [
        {
          english: 'I give cute panda very bad indigestion',
          chinese: '我給可愛的熊貓帶來了非常糟糕的消化不良',
        },
        {
          english: 'You cant handle my cheesy goodness',
          chinese: '你無法處理我的俗氣',
        },
        {
          english: 'Panda dies of high cholesterol',
          chinese: '熊貓死於高膽固醇',
        },
        {
          english: 'Bread + cheese = sweet death',
          chinese: '麵包+奶酪=甜蜜的死亡',
        },
      ],
      B: [
        {
          english: 'He was a nice pirate, until I bit his head off',
          chinese: '他是一個很好的海盜，直到我咬了他的頭',
        },
        {
          english: 'My noodle bowl is full of pirate intestines',
          chinese: '我的麵碗裡到處都是海盜腸',
        },
        {
          english: 'My chopsticks went right through his eye...and his brain',
          chinese: '我的筷子穿過他的眼睛......和他的大腦',
        },
        {
          english: 'Your skull makes a nice soup bowl',
          chinese: '你的頭骨是一個很好的湯碗',
        },
      ],
      C: [
        {
          english: 'Yo ho ho and a piece of pizza',
          chinese: 'Yo ho ho和一塊披薩',
        },
        {
          english: 'A pizza a day keeps the scurvy away',
          chinese: '每天吃披薩可以防止壞血病',
        },
        {
          english: 'Shiver me pizzas',
          chinese: '顫抖我的比薩餅',
        },
        {
          english: 'X marks the spot to my stomach',
          chinese: 'X標誌著我的胃部',
        },
      ],
    },
  },
  sounds: {
    waitingMusic: themeMusic,
    countdownBeep,
    playerMoveSelected,
  },
  style: {
    headerBackgroundColor: '#E36E65',
    pageBackgroundColor: '#95C0AB',
    textColor: '#1A414D',
  },
};
