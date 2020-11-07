import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useThemeComponents } from '../../providers/hooks/useThemeComponents';

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

export const ThemedUi = ({ children }: { children: any }) => {
  const [uiTheme, setUiTheme] = useState<ThemeStyles | undefined>(undefined);
  const themeComponents = useThemeComponents();

  useEffect(() => {
    if (!themeComponents) {
      return;
    }

    setUiTheme(themeComponents.style);
  }, [themeComponents]);

  if (!uiTheme) {
    return <LoadingSpinner text="Loading theme" />;
  }
  return <ThemeProvider theme={uiTheme}>{children}</ThemeProvider>;
};
