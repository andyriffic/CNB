
import React from 'react';
import { NinjaSelector, CowboySelector, BearSelector } from './components/select-move-symbols'
import PandaCharacter from './components/characters/panda';
import PizzaCharacter from './components/characters/pizza';
import PirateCharacter from './components/characters/pirate';

import CowboyWinning from './components/winning-animations/cowboy';
import NinjaWinning from './components/winning-animations/ninja';
import BearWinning from './components/winning-animations/bear';

import themeMusic from './sounds/zazie.mp3';
import countdownBeep from './sounds/bell.wav';

import cowboyWinningSound from './sounds/cowboy-win.mp3';
import ninjaWinningSound from './sounds/ninja-win.mp3';
import bearWinningSound from './sounds/bear-win.wav';


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
      A: ninjaWinningSound,
      B: cowboyWinningSound,
      C: bearWinningSound,
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
