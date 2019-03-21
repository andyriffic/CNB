import {
  NinjaSelector,
  CowboySelector,
  BearSelector,
} from './components/select-move-symbols';
import PandaCharacter from './components/characters/totoro';
import PantherCharacter from './components/characters/panther';
import PirateCharacter from './components/characters/laughing';

import themeMusic from './sounds/riverside_ride.mp3';
import countdownBeep from './sounds/countdown-blip.wav';
import playerMoveSelected from '../../sounds/move-selected.wav';

import winingSound from './sounds/hammer_bros.mp3';

import ResultScreen from '../../screens/spectator-screen/components/result';

export default {
  name: 'Goodbye Fang Lin',
  gameplay: {
    resultScreen: ResultScreen,
  },
  characters: {
    nameMapping: {
      A: 'Panther 豹',
      B: 'CSS Totoro',
      C: 'Laughing 笑',
    },
    selectMoveMapping: {
      A: NinjaSelector,
      B: CowboySelector,
      C: BearSelector,
    },
    characterMapping: {
      A: PantherCharacter,
      B: PandaCharacter,
      C: PirateCharacter,
    },
    winningAnimationMapping: {
      A: null,
      B: null,
      C: null,
    },
    winningSoundMapping: {
      A: winingSound,
      B: winingSound,
      C: winingSound,
    },
    winningPhrases: {
      A: [
        {
          english: 'Goodbye Fang Lin, we will miss you',
          chinese: '再見方林，我們會想念你',
        },
      ],
      B: [
        {
          english: 'Goodbye Fang Lin, we will miss you',
          chinese: '再見方林，我們會想念你',
        },
      ],
      C: [
        {
          english: 'Goodbye Fang Lin, we will miss you',
          chinese: '再見方林，我們會想念你',
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
    pageBackgroundColor: '#8869A5',
    textColor: '#1B1422',
  },
};
