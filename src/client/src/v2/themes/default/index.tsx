import React from 'react';
import { ThemeComponents } from '..';
import sounds from './sounds';
import style from './style';
import thinkingCat from './thinking-cat.gif';
import rockImage from './moves/rock.png';
import paperImage from './moves/paper.png';
import scissorsImage from './moves/scissors.png';

export const ThinkingCat = () => {
  return <img src={thinkingCat} style={{ width: '100%', height: '100%' }} />;
};

const themeComponents: ThemeComponents = {
  moveThemeName: 'rock-paper-scissors-classic',
  sounds,
  style,
  moves: {
    A: <img src={rockImage} style={{ width: '100%', height: '100%' }} />,
    B: <img src={scissorsImage} style={{ width: '100%', height: '100%' }} />,
    C: <img src={paperImage} style={{ width: '100%', height: '100%' }} />,
  },
  decorations: {
    moveWaiting: <ThinkingCat />,
    prizeIcon: <span>🎁</span>,
    bombIcon: <span>💣</span>,
  },
};

export default themeComponents;
