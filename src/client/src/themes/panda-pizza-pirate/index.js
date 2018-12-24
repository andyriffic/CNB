
import React from 'react';
import { NinjaSelector, CowboySelector, BearSelector } from './components/select-move-symbols'
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
    }
  },
  sounds: {
    waitingMusic: themeMusic,
    countdownBeep,
  },
  style: {
    headerBackgroundColor: '#E36E65',
    pageBackgroundColor: '#95C0AB',
    textColor: '#1A414D',
  }
}
