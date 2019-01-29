import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import { getThemeForDate } from './theme-providers';

const View = ({ children }) => {
  const today = new Date();
  let theme = getThemeForDate(today);
  console.log('Setting theme', theme);

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
