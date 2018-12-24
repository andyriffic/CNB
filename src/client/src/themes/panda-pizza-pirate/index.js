import React from 'react';
import {
  NinjaSelector,
  CowboySelector,
  BearSelector,
} from './components/select-move-symbols';
import PandaCharacter from './components/characters/panda';
import PizzaCharacter from './components/characters/pizza';
import PirateCharacter from './components/characters/pirate';

import CowboyWinning from './components/winning-animations/cowboy';
import NinjaWinning from './components/winning-animations/ninja';
import BearWinning from './components/winning-animations/bear';

import themeMusic from './sounds/zazie.mp3';
import countdownBeep from './sounds/countdown-blip.wav';

import cowboyWinningSound from './sounds/cowboy-win.mp3';
import pizzaWinningSound from './sounds/pizza-win.mp3';
import pirateWinningSound from './sounds/pirate-win.mp3';

export default {
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
      A: NinjaWinning,
      B: CowboyWinning,
      C: BearWinning,
    },
    winningSoundMapping: {
      A: pizzaWinningSound,
      B: cowboyWinningSound,
      C: pirateWinningSound,
    },
    winningPhrases: {
      A: [
        {
          english: 'I give cute panda very bad indigestion',
          chinese: '我給可愛的熊貓帶來了非常糟糕的消化不良',
        },
      ],
      B: [
        {
          english: 'He was a nice pirate, until I bit his head off',
          chinese: '他是一個很好的海盜，直到我咬了他的頭',
        },
      ],
      C: [
        {
          english: 'Yo ho ho and a piece of pizza',
          chinese: '喲ho ho和一塊披薩',
        },
      ],
    },
  },
  sounds: {
    waitingMusic: themeMusic,
    countdownBeep,
  },
  style: {
    headerBackgroundColor: '#E36E65',
    pageBackgroundColor: '#95C0AB',
    textColor: '#1A414D',
  },
};
