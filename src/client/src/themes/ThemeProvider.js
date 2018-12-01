import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import CowboyNinjaBearTheme from './cowboy-ninja-bear';
import XmasTheme from './xmas';
import { isFeatureEnabled } from '../featureToggle';

const View = ({children}) => {

  const theme = isFeatureEnabled('xmas') ? XmasTheme : CowboyNinjaBearTheme;

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
