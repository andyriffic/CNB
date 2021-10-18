import React from 'react';
import defaultTheme from '../default';
import { ThemeComponents } from '..';
import {
  SpookyGhost,
  SpookyPumpkin,
  SpookySpider,
  ThinkingCat,
} from './HalloweenDecorations';
import rockImage from './moves/halloween-rock.png';
import scissorsImage from './moves/halloween-scissors.png';
import paperImage from './moves/halloween-paper.png';
import sounds from './sounds';
import style from './style';

const themeComponents: ThemeComponents = {
  ...defaultTheme,
  moveThemeName: 'rock-paper-scissors-halloween',
  sounds,
  style,
  moves: {
    A: <img src={rockImage} style={{ width: '100%', height: '100%' }} />,
    B: <img src={scissorsImage} style={{ width: '100%', height: '100%' }} />,
    C: <img src={paperImage} style={{ width: '100%', height: '100%' }} />,
  },
  decorations: {
    ...defaultTheme.decorations,
    spectatorScreen: (
      <>
        <SpookyGhost />
        <SpookyPumpkin />
        <SpookySpider />
      </>
    ),
    moveWaiting: <ThinkingCat />,
  },
};

export default themeComponents;
