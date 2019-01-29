import React from 'react';
import GameThemeContext from '../contexts/GameThemeContext';
import { isFeatureEnabled } from '../featureToggle';
import { DefaultThemeProvider } from './theme-providers/DefaultThemeProvider';
import { FeatureToggleThemeProvider } from './theme-providers/FeatureToggleThemeProvider';
import { DayOfWeekThemeProvider } from './theme-providers/DayOfWeekThemeProvider';
import { SpecialDateThemeProvider } from './theme-providers/SpecialDateThemeProvider';

const themeProviders = [
  new FeatureToggleThemeProvider(isFeatureEnabled),
  new SpecialDateThemeProvider(),
  new DayOfWeekThemeProvider(),
  new DefaultThemeProvider(),
];

const View = ({ children }) => {
  let theme = null;
  for (let i = 0; i < themeProviders.length; i++) {
    const themeProvider = themeProviders[i];
    theme = themeProvider.getTheme();
    if (theme) {
      break;
    }
  }

  return (
    <GameThemeContext.Provider value={theme}>
      {children}
    </GameThemeContext.Provider>
  );
};

export default View;
