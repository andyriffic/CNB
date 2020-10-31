import React from 'react';
import { ThemeComponents } from '..';
import sounds from './sounds';
import style from './style';
import thinkingCat from './thinking-cat.gif';

export const ThinkingCat = () => {
  return <img src={thinkingCat} style={{ width: '100%', height: '100%' }} />;
};

const themeComponents: ThemeComponents = {
  moveThemeName: 'rock-paper-scissors-classic',
  sounds,
  style,
  decorations: {
    moveWaiting: <ThinkingCat />,
  },
};

export default themeComponents;
