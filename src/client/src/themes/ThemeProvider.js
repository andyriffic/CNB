import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import CowboyNinjaBearTheme from './cowboy-ninja-bear';
import PandaPizzaPirateTheme from './panda-pizza-pirate';
import XmasTheme from './xmas';
import NewYearTheme from './new-year';
import { isFeatureEnabled } from '../featureToggle';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getThemeFromFeatureToggle = () => {
  let theme;
  if (isFeatureEnabled('cnb')) {
    theme = CowboyNinjaBearTheme;
  } else if (isFeatureEnabled('ppp')) {
    theme = PandaPizzaPirateTheme;
  } else if (isFeatureEnabled('xmas')) {
    theme = XmasTheme;
  } else if (isFeatureEnabled('new-year')) {
    theme = NewYearTheme;
  }

  return theme;
};

const getThemeForDate = () => {
  let theme;
  const dayOfWeek = DAYS[new Date().getDay()];

  switch (dayOfWeek) {
    case 'Mon':
    case 'Wed':
    case 'Fri':
      theme = PandaPizzaPirateTheme;
      break;

    case 'Tue':
    case 'Thu':
      theme = CowboyNinjaBearTheme;
      break;

    default:
      console.warn('No theme selected for date');
  }

  return theme;
};

const View = ({ children }) => {
  let theme = getThemeFromFeatureToggle();

  if (!theme) {
    theme = NewYearTheme;
  }

  if (!theme) {
    theme = getThemeForDate();
  }

  if (!theme) {
    console.warn('No theme found, using default');
    theme = CowboyNinjaBearTheme;
  }

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
