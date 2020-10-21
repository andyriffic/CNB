import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { getPlayerAttributeValue } from '../../../uplift/utils/player';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import defaultTheme from './themes/default';
import halloweenTheme from './themes/halloween';

export interface ThemeStyles {
  fontFamily: {
    feature: string;
  };
  color: {
    primaryBackground: string;
    background01: string;
    background02: string;
    background03: string;
    text01: string;
    text02: string;
    text03: string;
    border01: string;
    points: {
      backgroundVariant01: string;
      backgroundVariant02: string;
      backgroundVariant03: string;
    };
  };
  fontSize: {
    extraSmall: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
}

type ThemeMap = {
  [key: string]: ThemeStyles;
};

const themeMap: ThemeMap = {
  halloween: halloweenTheme,
};

export const ThemedUi = ({ children }: { children: any }) => {
  const { allPlayers } = usePlayersProvider();
  const [uiTheme, setUiTheme] = useState<ThemeStyles | undefined>(undefined);

  useEffect(() => {
    if (!allPlayers.length) {
      return;
    }

    const settingsPlayer = allPlayers.find(p => p.id === 'mc_settings_face');
    if (!settingsPlayer) {
      setUiTheme(defaultTheme);
    } else {
      const configuredThemeName = getPlayerAttributeValue(
        settingsPlayer.tags,
        'theme',
        'default'
      );
      setUiTheme(themeMap[configuredThemeName] || defaultTheme);
    }
  }, [allPlayers]);

  if (!uiTheme) {
    return <LoadingSpinner text="Loading theme" />;
  }
  return <ThemeProvider theme={uiTheme}>{children}</ThemeProvider>;
};
