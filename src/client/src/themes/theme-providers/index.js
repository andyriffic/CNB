import { isFeatureEnabled } from '../../featureToggle';
import DefaultThemeProvider from '../theme-providers/DefaultThemeProvider';
import FeatureToggleThemeProvider from '../theme-providers/FeatureToggleThemeProvider';
import DayOfWeekThemeProvider from '../theme-providers/DayOfWeekThemeProvider';
import SpecialDateThemeProvider from '../theme-providers/SpecialDateThemeProvider';

export const getThemeForDate = date => {
  /* TODO: creating theme provider instances each time this function is called due to date requirements.
    Consider different way?
  */

  // Order by most important priority
  const themeProviders = [
    new FeatureToggleThemeProvider(isFeatureEnabled),
    new SpecialDateThemeProvider(date),
    new DayOfWeekThemeProvider(date),
    new DefaultThemeProvider(),
  ];

  let theme = null;
  for (let i = 0; i < themeProviders.length; i++) {
    const themeProvider = themeProviders[i];
    theme = themeProvider.getTheme();
    if (theme) {
      break;
    }
  }

  return theme;
};
