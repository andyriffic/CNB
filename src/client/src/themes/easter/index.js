import {
  NinjaSelector,
  CowboySelector,
  BearSelector,
} from './components/select-move-symbols';
import PandaCharacter from './components/characters/egg';
import PizzaCharacter from './components/characters/bunny';
import PirateCharacter from './components/characters/hot-cross-bun';

import themeMusic from './sounds/waiting.mp3';
import countdownBeep from './sounds/countdown-blip.wav';
import playerMoveSelected from '../../sounds/move-selected.wav';

import pandaWiningSound from './sounds/egg-win.mp3';
import pizzaWinningSound from './sounds/bunny-win.mp3';
import pirateWinningSound from './sounds/bun-win.mp3';

import ResultScreen from '../../screens/spectator-screen/components/result';

export default {
  name: 'Easter',
  gameplay: {
    resultScreen: ResultScreen,
  },
  characters: {
    nameMapping: {
      A: 'Bunny 復活節兔子',
      B: 'Egg 復活節彩蛋',
      C: 'Cross bun 十字麵包',
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
          english: 'Rabbit droppings are just recycled easter eggs',
          chinese: '兔子糞便只是回收的複活節彩蛋',
        },
      ],
      B: [
        {
          english: 'Chocolate is always better than raisins',
          chinese: '巧克力總是比葡萄乾好',
        },
      ],
      C: [
        {
          english: 'Choke on my gluten',
          chinese: '嗆到我的麵筋',
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
    headerBackgroundColor: '#379fab',
    pageBackgroundColor: '#085761',
    textColor: '#f5f5f5',
  },
};
