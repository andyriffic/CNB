import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export type GameTheme = {
  headerBackgroundColor: string;
  pageBackgroundColor: string;
  textColor: string;
};

const defaultTheme = {
  headerBackgroundColor: '#E36E65',
  pageBackgroundColor: '#95C0AB',
  textColor: '#1A414D',
};

export const MatchupContext = React.createContext<GameTheme>(defaultTheme);

export const Theme = ({ children }: { children: any }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
