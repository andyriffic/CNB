import React from 'react';
import { ThemeProvider } from 'styled-components';

type ThemeStyle = {
  headerBackgroundColor: string;
  pageBackgroundColor: string;
  textColor: string;
};

type ThemedMove = {
  name: string;
  translation: string;
};

export type GameTheme = {
  style: ThemeStyle;
  themedMoves: { [moveId: string]: ThemedMove };
};

const defaultTheme = {
  style: {
    headerBackgroundColor: '#E36E65',
    pageBackgroundColor: '#95C0AB',
    textColor: '#1A414D',
  },
  themedMoves: {
    A: { name: 'Ninja', translation: '忍者' },
    B: { name: 'Cowboy', translation: '牛仔' },
    C: { name: 'Bear', translation: '熊' },
  },
};

export const GameThemeContext = React.createContext<GameTheme>(defaultTheme);

export const Theme = ({ children }: { children: any }) => {
  return (
    <GameThemeContext.Provider value={defaultTheme}>
      <ThemeProvider theme={defaultTheme.style}>{children}</ThemeProvider>
    </GameThemeContext.Provider>
  );
};
