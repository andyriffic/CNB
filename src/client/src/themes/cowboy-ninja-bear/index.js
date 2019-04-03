import {
  NinjaSelector,
  CowboySelector,
  BearSelector,
} from './components/select-move-symbols';
import CowboyCharacter from './components/characters/cowboy';
import NinjaCharacter from './components/characters/ninja';
import BearCharacter from './components/characters/bear';

import CowboyWinning from './components/winning-animations/cowboy';
import NinjaWinning from './components/winning-animations/ninja';
import BearWinning from './components/winning-animations/bear';

import waitingSound from './sounds/waiting-music-loop.mp3';
import countdownBeep from '../../sounds/countdown-blip.wav';
import playerMoveSelected from '../../sounds/move-selected.wav';

import cowboyWinningSound from './sounds/cowboy-win.mp3';
import ninjaWinningSound from './sounds/ninja-win.mp3';
import bearWinningSound from './sounds/bear-win.wav';

import ResultScreen from '../../screens/spectator-screen/components/result';

export default {
  name: 'Ninja, Cowboy, Bear',
  gameplay: {
    resultScreen: ResultScreen,
  },
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
    winningSoundMapping: {
      A: ninjaWinningSound,
      B: cowboyWinningSound,
      C: bearWinningSound,
    },
    likes: {
      A: ['Sneaking around 偷偷摸摸', 'Murder 謀殺'],
      B: ['Bear skin rugs 熊皮地毯', 'Shooting guns 射擊槍'],
      C: ['High fives 擊掌', 'Wrestling 摔角'],
    },
    dislikes: {
      A: ['Big paws 大爪子', 'Having face scratched off 臉被刮掉了'],
      B: ['Ninja stars in the eye 忍者星在眼裡', 'Sudden death 猝死'],
      C: ['Bullets 子彈', 'Fur fashion 皮草時尚'],
    },
    winningPhrases: {
      A: [
        {
          english: 'Judo Chop!',
          chinese: '柔道斬',
        },
      ],
      B: [
        {
          english: 'Good, I needed a bear skin rug for my cabin',
          chinese: '好，我的小屋需要熊皮地毯',
        },
      ],
      C: [
        {
          english: 'lets take a trip...to the MAUL!',
          chinese: '讓我們去旅行...去MAUL！',
        },
      ],
    },
  },
  sounds: {
    waitingMusic: waitingSound,
    countdownBeep,
    playerMoveSelected,
  },
  style: {
    headerBackgroundColor: '#9DADBC',
    pageBackgroundColor: '#6ba2cc',
    textColor: '#000000',
  },
};
