import { addStatsEntry } from './addStatsEntry';
import { publishStats } from './publishStats';


const testPayload = {
  date: '2019-04-26T01:43:07.367Z',
  player1: {
    team: 'XIAN',
    move: 'B',
    powerUpUsed: 'NONE',
    player: 'Bin',
    winner: true,
    points: 1,
    trophy: false,
  },
  player2: {
    team: 'MELB',
    move: 'A',
    powerUpUsed: 'NONE',
    player: 'Liujing',
    winner: false,
    points: 0,
    trophy: false,
  },
  theme: 'Easter',
  result: {
    draw: false,
    winner: 'player1',
  },
};

addStatsEntry(testPayload);
publishStats();
