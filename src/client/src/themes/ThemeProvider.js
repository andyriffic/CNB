import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import PandaPizzaPirateTheme from './panda-pizza-pirate';

const View = ({ children }) => {
  let theme = PandaPizzaPirateTheme; // Hard-code until we hook into the server for the theme
  console.log('Setting theme', theme);

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
