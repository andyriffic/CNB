import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import CowboyNinjaBearTheme from './cowboy-ninja-bear';
import PandaPizzaPirate from './panda-pizza-pirate';
import { isFeatureEnabled } from '../featureToggle';

const View = ({ children }) => {
  const theme = isFeatureEnabled('normal')
    ? CowboyNinjaBearTheme
    : PandaPizzaPirate;

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
