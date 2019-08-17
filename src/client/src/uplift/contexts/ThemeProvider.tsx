import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';

enum THEME_EVENTS {
  THEME_UPDATE = 'THEME_UPDATE',
  REQUEST_THEMES = 'REQUEST_THEMES',
}

export type ThemeStyle = {
  headerBackgroundColor: string;
  headerTextColor: string;
  featureBackgroundColor: string;
  featureTextColor: string;
  pageBackgroundColor: string;
  primaryTextColor: string;
  primaryBorderColor: string;
};

export type ThemedMove = {
  name: {
    english: string;
    chinese: string;
  };
  imageUrl: string;
};

export type GameTheme = {
  name: {
    english: string;
    chinese: string;
  };
  moves: { [moveKey: string]: ThemedMove };
  style: ThemeStyle;
  sounds: {
    musicUrl: string;
  };
};

export type GameThemeService = {
  theme: GameTheme;
  setTheme: (themeId: string) => void;
};

const defaultValue: GameThemeService = {
  theme: {
    name: { english: 'Rock, Paper, Scissors', chinese: '牛仔，忍者，熊' },
    style: {
      headerBackgroundColor: '#F8F8FF',
      headerTextColor: '#000',
      featureBackgroundColor: '#F8F8FF',
      featureTextColor: '#000',
      pageBackgroundColor: '#F8F8FF',
      primaryTextColor: '#000',
      primaryBorderColor: '#000'
    },
    moves: {
      A: {
        name: { english: 'Ninja', chinese: '忍者' },
        imageUrl: '/theme/cnb/ninja.png',
      },
      B: {
        name: { english: 'Cowboy', chinese: '牛仔' },
        imageUrl: '/theme/cnb/cowboy.png',
      },
      C: {
        name: { english: 'Bear', chinese: '熊' },
        imageUrl: '/theme/cnb/bear.png',
      },
    },
    sounds: {
      musicUrl: '',
    },
  },
  setTheme: () => {
    console.log('setTheme not implemented yet 😱');
  },
};

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/theme-realz`);

export const GameThemeContext = React.createContext<GameThemeService>(
  defaultValue
);

export const Theme = ({ children }: { children: any }) => {
  const [currentThemeId, setCurrentThemeId] = useState('');
  const [allThemes, setAllThemes] = useState({
    [currentThemeId]: defaultValue.theme,
  });

  useEffect(() => {
    socket.on(
      THEME_EVENTS.THEME_UPDATE,
      (themes: { [themeKey: string]: GameTheme }) => {
        console.log('THEMES', themes);
        setAllThemes(themes);
      }
    );
    socket.emit(THEME_EVENTS.REQUEST_THEMES);
  }, []);

  return (
    <GameThemeContext.Provider
      value={{
        theme: allThemes[currentThemeId] || defaultValue.theme,
        setTheme: themeId =>
          setCurrentThemeId(themeId),
      }}
    >
      <ThemeProvider theme={(allThemes[currentThemeId] || defaultValue.theme).style}>
        {children}
      </ThemeProvider>
    </GameThemeContext.Provider>
  );
};
