import React from 'react';
import { ThemeComponents } from '..';
import {
  SpookyGhost,
  SpookyPumpkin,
  SpookySpider,
} from './HalloweenDecorations';
import sounds from './sounds';
import style from './style';

const themeComponents: ThemeComponents = {
  moveThemeName: 'rock-paper-scissors-halloween',
  sounds,
  style,
  decorations: {
    spectatorScreen: (
      <>
        <SpookyGhost />
        <SpookyPumpkin />
        <SpookySpider />
      </>
    ),
  },
};

export default themeComponents;
