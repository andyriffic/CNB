import React from 'react';
import { ThemeProvider } from 'styled-components';

type ThemeStyle = {
  headerBackgroundColor: string;
  pageBackgroundColor: string;
  textColor: string;
};

export type ThemedMove = {
  name: string;
  translation: string;
  imageUrl: string;
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
    A: { name: 'Ninja', translation: '忍者', imageUrl: '/theme/cnb/ninja.png' },
    B: { name: 'Cowboy', translation: '牛仔', imageUrl: '/theme/cnb/cowboy.png' },
    C: { name: 'Bear', translation: '熊', imageUrl: '/theme/cnb/bear.png' },
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
