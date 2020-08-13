import React from 'react';
import { ThemeProvider } from 'styled-components';
import { primaryBackgroundColorHex } from './styleguide';

const theme = {
  fontFamily: {
    feature: "'Alfa Slab One', cursive",
  },
  color: {
    primaryBackground: primaryBackgroundColorHex,
  },
  fontSize: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.5rem',
    extraLarge: '3rem',
  },
};

export const ThemedUi = ({ children }: { children: any }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
