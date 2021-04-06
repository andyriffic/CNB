import React from 'react';
import { ThemeComponents } from '..';
import defaultTheme from '../default';
import defaultSounds from '../default/sounds';
import style from './style';
import thinkingCat from './thinking-cat.gif';
import rockImage from './8bit-rock.png';
import scissorsImage from './8bit-scissors.png';
import paperImage from './8bit-paper.png';
import bombImage from './bomb.png';
import megamanTheme from './sounds/megaman_2_8bit.mp3';
import tetrisTheme from './sounds/tetris_8bit_b_theme.mp3';
import retroNotification from './sounds/retro_notification.mp3';
import winner from './sounds/winner.mp3';
import msPackman from './sounds/ms_pacman_c64.mp3';
import eightBitNotification from './sounds/8bit_notification.mp3';
import winnerVoice from './sounds/winner_voice.mp3';

const themeComponents: ThemeComponents = {
  ...defaultTheme,
  moveThemeName: 'rock-paper-scissors-retro',
  style,
  sounds: {
    ...defaultSounds,
    WaitForPlayersToJoin: megamanTheme,
    PlayerMoved: retroNotification,
    RoundStart: winner,
    WaitForMoves: tetrisTheme,
    GameOver: msPackman,
    ShowBasePoints: eightBitNotification,
    FinalPointsAllocated: eightBitNotification,
    Winner: winnerVoice,
  },
  moves: {
    A: <img src={rockImage} style={{ width: '100%', height: '100%' }} />,
    B: <img src={scissorsImage} style={{ width: '100%', height: '100%' }} />,
    C: <img src={paperImage} style={{ width: '100%', height: '100%' }} />,
  },
  decorations: {
    ...defaultTheme.decorations,
    moveWaiting: (
      <img src={thinkingCat} style={{ width: '100%', height: '100%' }} />
    ),
    prizeIcon: <span>🍒</span>,
    bombIcon: (
      <img
        src={bombImage}
        alt="bomb"
        style={{ width: '80px', height: '80px' }}
      />
    ),
  },
};

export default themeComponents;
