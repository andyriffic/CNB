import React from 'react';
import { ThemeComponents } from '..';
import defaultTheme from '../default';
import defaultSounds from '../default/sounds';
import style from './style';
import thinkingCat from './thinking-cat.gif';
import rockImage from './rock.png';
import scissorsImage from './scissors.png';
import paperImage from './paper.png';
import bombImage from './bomb.png';
import megamanTheme from './sounds/megaman_2_8bit.mp3';
import tetrisTheme from './sounds/tetris_8bit_b_theme.mp3';
import retroNotification from './sounds/retro_notification.mp3';
import arcadeCoin from './sounds/arcade_sf_coin.mp3';
import msPackman from './sounds/ms_pacman_c64.mp3';
import eightBitNotification from './sounds/8bit_notification.mp3';
import winnerVoice from './sounds/winner_voice.mp3';
import { FancyLink } from '../../../components/FancyLink';
import questionImage from './question.png';

const themeComponents: ThemeComponents = {
  ...defaultTheme,
  moveThemeName: 'rock-paper-scissors-retro',
  style,
  sounds: {
    ...defaultSounds,
    WaitForPlayersToJoin: megamanTheme,
    PlayerMoved: retroNotification,
    RoundStart: arcadeCoin,
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
    moveMade: (
      <img src={questionImage} style={{ width: '100%', height: '100%' }} />
    ),
    prizeIcon: <span>🍒</span>,
    bombIcon: (
      <img
        src={bombImage}
        alt="bomb"
        style={{ width: '80px', height: '80px' }}
      />
    ),
    mainGameOverAction: (
      <FancyLink href="/donkey-kong">🦍 To Donkey Kong</FancyLink>
    ),
  },
};

export default themeComponents;
