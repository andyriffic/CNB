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

import ResultAlternateScreen from '../../screens/spectator-screen-alternate/components/result-alternate';

export default {
  name: 'Pizza, Panda, Pirate',
  gameplay: {
    resultScreen: ResultAlternateScreen,
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
      ],
      C: [
        {
          english: 'Yo ho ho and a piece of pizza',
          chinese: '喲ho ho和一塊披薩',
        },
        {
          english: 'A pizza a day keeps the scurvy away',
          chinese: '每天吃披薩可以防止壞血病',
        },
        {
          english: 'Shiver me pizzas',
          chinese: '顫抖我的比薩餅',
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
