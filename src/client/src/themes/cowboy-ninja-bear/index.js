
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

export const characterNameMapping = {
  A: 'Ninja 忍者',
  B: 'Cowboy 牛仔',
  C: 'Bear 熊',
}

export const selectMoveComponentMapping = {
  A: NinjaSelector,
  B: CowboySelector,
  C: BearSelector,
}

export const characterMapping = {
  A: NinjaCharacter,
  B: CowboyCharacter,
  C: BearCharacter,
}

export const winningAnimationCharacterMapping = {
  A: NinjaWinning,
  B: CowboyWinning,
  C: BearWinning,
}

export { waitingSound };

export const winningSoundMapping = {
  A: ninjaWinningSound,
  B: cowboyWinningSound,
  C: bearWinningSound,
}
