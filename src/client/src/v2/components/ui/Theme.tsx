import React from 'react';
import { ThemeProvider } from 'styled-components';
import { primaryBackgroundColorHex } from './styleguide';

export interface ThemeStyles {
  fontFamily: {
    feature: string;
  };
  color: {
    primaryBackground: string;
    background01: string;
    background02: string;
    text01: string;
    text02: string;
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

const theme: ThemeStyles = {
  fontFamily: {
    feature: "'Alfa Slab One', cursive",
  },
  color: {
    primaryBackground: primaryBackgroundColorHex,
    background01: '#2193b0',
    background02: '#6dd5ed',
    text01: 'coral',
    text02: 'black',
    points: {
      backgroundVariant01: 'steelblue',
      backgroundVariant02: 'darkkhaki',
      backgroundVariant03: 'goldenrod',
    },
  },
  fontSize: {
    extraSmall: '0.4rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.5rem',
    extraLarge: '3rem',
  },
};

export const ThemedUi = ({ children }: { children: any }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
