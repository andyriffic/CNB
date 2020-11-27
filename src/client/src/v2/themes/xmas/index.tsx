import React from 'react';
import { ThemeComponents } from '..';
import defaultTheme from '../default';
import style from './style';
import xmasThinkingCat from './xmas-thinking-cat.gif';
import rockImage from './xmas-rock.png';
import scissorsImage from './xmas-scissors.png';
import paperImage from './xmas-paper.png';

const themeComponents: ThemeComponents = {
  ...defaultTheme,
  moveThemeName: 'rock-paper-scissors-xmas',
  style,
  moves: {
    A: <img src={rockImage} style={{ width: '100%', height: '100%' }} />,
    B: <img src={scissorsImage} style={{ width: '100%', height: '100%' }} />,
    C: <img src={paperImage} style={{ width: '100%', height: '100%' }} />,
  },
  decorations: {
    ...defaultTheme.decorations,
    moveWaiting: (
      <img src={xmasThinkingCat} style={{ width: '100%', height: '100%' }} />
    ),
  },
};

export default themeComponents;
