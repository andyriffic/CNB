import React from 'react';
import { ThemeProvider } from 'styled-components';
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

export const ThemedUi = ({ children }: { children: any }) => {
  return <ThemeProvider theme={halloweenTheme}>{children}</ThemeProvider>;
};
