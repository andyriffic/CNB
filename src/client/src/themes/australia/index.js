import {
  KangarooSelector,
  SteveIrwinSelector,
  DidgeridooSelector,
} from './components/select-move-symbols';
import KangarooCharacter from './components/characters/kangaroo';
import SteveIrwinCharacter from './components/characters/steve-irwin';
import DidgeridooCharacter from './components/characters/didgeridoo';

import waitingMusic from './sounds/waltzing_matilda.mp3';
import countdownBeep from './sounds/count-down.m4a';
import playerMoveSelected from '../../sounds/move-selected.wav';

import crikeySound from './sounds/crikey.wav';
import didgeridooSound from './sounds/didgeridoo.wav';
import kangarooSound from './sounds/kangaroo.mp3';

import ResultAlternateScreen from '../../screens/spectator-screen/components/result-alternate';

export default {
  name: 'Australia',
  gameplay: {
    resultScreen: ResultAlternateScreen,
  },
  characters: {
    nameMapping: {
      A: 'Kangaroo 袋鼠',
      B: 'Steve Irwin 史蒂夫歐文',
      C: 'Didgeridoo 迪吉里杜管',
    },
    selectMoveMapping: {
      A: KangarooSelector,
      B: SteveIrwinSelector,
      C: DidgeridooSelector,
    },
    characterMapping: {
      A: KangarooCharacter,
      B: SteveIrwinCharacter,
      C: DidgeridooCharacter,
    },
    winningSoundMapping: {
      A: kangarooSound,
      B: crikeySound,
      C: didgeridooSound,
    },
    winningPhrases: {
      A: [
        {
          imageUrl:
            'https://media.giphy.com/media/3o7qE5866bLg4VKabe/giphy.gif',
        },
      ],
      B: [
        {
          imageUrl: 'https://media.giphy.com/media/k2bbmbmvUo7gA/giphy.gif',
        },
      ],
      C: [
        {
          imageUrl:
            'https://media.giphy.com/media/3o7TKPg3TxSa95XTlS/giphy.gif',
        },
      ],
    },
  },
  sounds: {
    waitingMusic: waitingMusic,
    countdownBeep,
    playerMoveSelected,
  },
  style: {
    headerBackgroundColor: '#FFCD00',
    pageBackgroundColor: '#00843D',
    textColor: '#20282E',
  },
};
