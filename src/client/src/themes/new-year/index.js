import {
  NianSelector,
  FireworkSelector,
  PigSelector,
} from './components/select-move-symbols';
import FireworkCharacter from './components/characters/firework';
import NianCharacter from './components/characters/nian';
import PigCharacter from './components/characters/pig';

import waitingMusic from './sounds/waiting.mp3';
import countdownBeep from './sounds/count-down.m4a';
import playerMoveSelected from '../../sounds/move-selected.wav';

import nianWinningSound from './sounds/nian-win.mp3';
import pigWinningSound from './sounds/pig-win.mp3';
import fireworkWinningSound from './sounds/firework-win.mp3';

import ResultScreen from '../../screens/spectator-screen/components/result';

export default {
  name: 'Chinese New Year',
  gameplay: {
    resultScreen: ResultScreen,
  },
  characters: {
    nameMapping: {
      A: 'Firework 鞭炮',
      B: 'Nian 年兽',
      C: 'Pig 猪',
    },
    selectMoveMapping: {
      A: FireworkSelector,
      B: NianSelector,
      C: PigSelector,
    },
    characterMapping: {
      A: FireworkCharacter,
      B: NianCharacter,
      C: PigCharacter,
    },
    winningSoundMapping: {
      A: fireworkWinningSound,
      B: nianWinningSound,
      C: pigWinningSound,
    },
    likes: {
      A: ['Loud noises 吵闹的声音', 'Scaring dragons 吓唬龙'],
      B: ['Tormenting villagers 折磨村民', 'Pork belly 豬肚'],
      C: ['Lighting matches 照明匹配', 'Red packets 紅包'],
    },
    dislikes: {
      A: ['Naughty pigs 顽皮的猪', 'Exploding to death 爆炸致死'],
      B: ['Loud noises 響亮的聲音', 'Social interaction 社交聯繫'],
      C: ['Dragon breath 龍的呼吸', 'Running 運行'],
    },
    winningPhrases: {
      A: [
        {
          english: 'The cracking sound can drive Nian away from the village',
          chinese: '鞭炮可以驱赶年兽，保护村庄',
        },
      ],
      B: [
        {
          english: 'Pork is rich in protein, carbohydrate and fat.',
          chinese: '猪肉富含蛋白质，碳水化合物以及脂肪',
        },
      ],
      C: [
        {
          english: 'I love to play the firecracker with my friends',
          chinese: '我喜欢和我的小伙伴们放鞭炮',
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
    headerBackgroundColor: '#FFB500',
    pageBackgroundColor: '#FF5961',
    textColor: '#20282E',
  },
};
