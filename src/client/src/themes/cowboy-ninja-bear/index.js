
import { NinjaSelector, CowboySelector, BearSelector } from './components/select-move-symbols'
import CowboyCharacter from './components/characters/cowboy';
import NinjaCharacter from './components/characters/ninja';
import BearCharacter from './components/characters/bear';

import CowboyWinning from './components/winning-animations/cowboy';
import NinjaWinning from './components/winning-animations/ninja';
import BearWinning from './components/winning-animations/bear';

import waitingSound from './sounds/waiting-music-loop.mp3';
import cowboyWinningSound from './sounds/cowboy-win.mp3';
import ninjaWinningSound from './sounds/ninja-win.mp3';
import bearWinningSound from './sounds/bear-win.wav';


export default {
  characters: {
    nameMapping: {
      A: 'Ninja 忍者',
      B: 'Cowboy 牛仔',
      C: 'Bear 熊',
    },
    selectMoveMapping: {
      A: NinjaSelector,
      B: CowboySelector,
      C: BearSelector,
    },
    characterMapping: {
      A: NinjaCharacter,
      B: CowboyCharacter,
      C: BearCharacter,
    },
    winningAnimationMapping: {
      A: NinjaWinning,
      B: CowboyWinning,
      C: BearWinning,
    },
    winningSoundsMapping: {
      A: ninjaWinningSound,
      B: cowboyWinningSound,
      C: bearWinningSound,
    }
  },
  music: {
    waitingMusic: waitingSound,
  },
}

export { waitingSound };

export const winningSoundMapping = {
  A: ninjaWinningSound,
  B: cowboyWinningSound,
  C: bearWinningSound,
}
