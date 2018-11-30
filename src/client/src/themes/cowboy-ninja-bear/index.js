
import { NinjaSelector, CowboySelector, BearSelector } from './components/select-move-symbols'
import CowboyCharacter from './components/characters/cowboy';
import NinjaCharacter from './components/characters/ninja';
import BearCharacter from './components/characters/bear';

import CowboyWinning from './components/winning-animations/cowboy';
import NinjaWinning from './components/winning-animations/ninja';
import BearWinning from './components/winning-animations/bear';

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
