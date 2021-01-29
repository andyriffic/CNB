import React from 'react';
import { ThemeComponents } from '..';
import defaultTheme from '../default';
import defaultSounds from '../default/sounds';
import style from './style';
import thinkingCat from './chinese-thinking-cat.gif';
import rockImage from './chinese-rock.png';
import scissorsImage from './chinese-scissors.png';
import paperImage from './chinese-paper.png';
import dragon from './chinese-dragon.gif';
import lantern from './chinese-lantern.gif';
import chineseSong from './chinese_song.mp3';
import chineseMusic from './chinese_music.mp3';
import chineseGong from './chinese_gong.mp3';
import asianLute from './asian_lute.mp3';
import asianTune from './asian_tune.mp3';

const themeComponents: ThemeComponents = {
  ...defaultTheme,
  moveThemeName: 'rock-paper-scissors-chinese',
  style,
  sounds: {
    ...defaultSounds,
    WaitForPlayersToJoin: chineseSong,
    WaitForMoves: chineseMusic,
    PlayerMoved: asianLute,
    RoundStart: chineseGong,
    GameOver: asianTune,
  },
  moves: {
    A: <img src={rockImage} style={{ width: '100%', height: '100%' }} />,
    B: <img src={scissorsImage} style={{ width: '100%', height: '100%' }} />,
    C: <img src={paperImage} style={{ width: '100%', height: '100%' }} />,
  },
  decorations: {
    spectatorScreen: (
      <>
        <img
          src={lantern}
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-200px',
            width: '300px',
          }}
        />
        <img
          src={lantern}
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-200px',
            width: '300px',
          }}
        />
        <img
          src={dragon}
          style={{
            position: 'absolute',
            bottom: '0',
            left: '35%',
            width: '400px',
          }}
        />
      </>
    ),
    moveWaiting: (
      <img src={thinkingCat} style={{ width: '100%', height: '100%' }} />
    ),
  },
};

export default themeComponents;
