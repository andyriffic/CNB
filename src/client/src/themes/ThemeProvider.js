import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import CowboyNinjaBearTheme from './cowboy-ninja-bear';
import PandaPizzaPirateTheme from './panda-pizza-pirate';
import XmasTheme from './xmas';
import NewYearTheme from './new-year';
import AustraliaTheme from './australia';
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
  } else if (isFeatureEnabled('australia')) {
    theme = AustraliaTheme;
  }

  return theme;
};

const getThemeForDayOfWeek = () => {
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

const getThemeForSpecialDate = () => {
  let theme;
  const today = new Date();
  const month = today.getMonth() + 1; // Add 1 since getMonth returns 0 based index
  const date = today.getDate();

  if (month === 1 && date === 29) {
    theme = AustraliaTheme;
  } else if (month === 1 && (date >= 21 && date <= 31)) {
    theme = NewYearTheme;
  }

  return theme;
};

const View = ({ children }) => {
  let theme = getThemeFromFeatureToggle();

  if (!theme) {
    theme = getThemeForSpecialDate();
  }

  if (!theme) {
    theme = getThemeForDayOfWeek();
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
