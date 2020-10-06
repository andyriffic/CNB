import React, { ReactNode, useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';

type ThemedMove = {
  name: {
    english: string;
    chinese: string;
  };
  winsBy: {
    english: string;
    chinese: string;
  };
  imageUrl: string;
};

type GameTheme = {
  name: {
    english: string;
    chinese: string;
  };
  moves: { [moveKey: string]: ThemedMove };
};

type ThemeDictionary = { [themeKey: string]: GameTheme };

export type MoveThemeService = {
  setTheme: (themeId: string) => void;
  currentTheme: GameTheme | undefined;
};

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/theme-realz`);

export const MoveThemeContext = React.createContext<
  MoveThemeService | undefined
>(undefined);

export const MoveThemeProvider = ({ children }: { children: ReactNode }) => {
  const [allThemes, setAllThemes] = useState<ThemeDictionary>({});
  const [currentTheme, setCurrentTheme] = useState<GameTheme | undefined>(
    undefined
  );

  useEffect(() => {
    socket.on('THEME_UPDATE', (themes: ThemeDictionary) => {
      console.log('THEMES', themes);
      setAllThemes(themes);
    });
    socket.emit('REQUEST_THEMES');

    return () => {
      socket.close();
    };
  }, []);

  return (
    <MoveThemeContext.Provider
      value={{
        setTheme: themeId => setCurrentTheme(allThemes[themeId]),
        currentTheme,
      }}
    >
      {children}
    </MoveThemeContext.Provider>
  );
};

export function useMoveThemeProvider() {
  const context = React.useContext(MoveThemeContext);
  if (context === undefined) {
    throw new Error(
      'useMoveThemeProvider must be used within a MoveThemeProvider'
    );
  }
  return context;
}
