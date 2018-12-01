import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import CowboyNinjaBearTheme from './cowboy-ninja-bear';

const View = ({children}) => {

  const theme = CowboyNinjaBearTheme;

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
