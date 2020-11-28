import React from 'react';
import { ThemeComponents } from '..';
import defaultTheme from '../default';
import defaultSounds from '../default/sounds';
import style from './style';
import xmasThinkingCat from './xmas-thinking-cat.gif';
import rockImage from './xmas-rock.png';
import scissorsImage from './xmas-scissors.png';
import paperImage from './xmas-paper.png';
import decoration from './xmas-decoration.png';
import santaRideToTown from './santa_ride_to_town.mp3';
import jingleBells from './jingle_bells.mp3';
import santaHoHoHoHoHo from './santa_ho_ho_ho_ho_ho.mp3';
import sleighBell from './sleigh_bell.mp3';

const themeComponents: ThemeComponents = {
  ...defaultTheme,
  moveThemeName: 'rock-paper-scissors-xmas',
  style,
  sounds: {
    ...defaultSounds,
    WaitForPlayersToJoin: jingleBells,
    WaitForMoves: santaRideToTown,
    PlayerMoved: santaHoHoHoHoHo,
    RoundStart: sleighBell,
  },
  moves: {
    A: <img src={rockImage} style={{ width: '100%', height: '100%' }} />,
    B: <img src={scissorsImage} style={{ width: '100%', height: '100%' }} />,
    C: <img src={paperImage} style={{ width: '100%', height: '100%' }} />,
  },
  decorations: {
    spectatorScreen: (
      <img
        src={decoration}
        style={{ position: 'absolute', top: '0', width: '100%' }}
      />
    ),
    moveWaiting: (
      <img src={xmasThinkingCat} style={{ width: '100%', height: '100%' }} />
    ),
  },
};

export default themeComponents;
