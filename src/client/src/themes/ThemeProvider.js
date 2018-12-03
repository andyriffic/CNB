import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import CowboyNinjaBearTheme from './cowboy-ninja-bear';
import XmasTheme from './xmas';
import { isFeatureEnabled } from '../featureToggle';

const DECEMBER_MONTH = 11; //javascript months are 0 based :)

const isDecemberAndBeforeChristmasDay = () => {
  const today = new Date();

  const month = today.getMonth();
  const day = today.getDate();

  return month === DECEMBER_MONTH && day <= 25;
}

const View = ({children}) => {

  const theme = isDecemberAndBeforeChristmasDay() ? XmasTheme : CowboyNinjaBearTheme;

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
