import React, { ReactNode, useEffect, useState } from 'react';
import { Howler } from 'howler';
import { getSavedGameSettings, saveGameSettings } from '../services/storage';

export type GameSettings = {
  soundVolume: number;
};

export type GameSettingsService = {
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;
};

const GameSettingsContext = React.createContext<
  GameSettingsService | undefined
>(undefined);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameSettings>({
    soundVolume: getSavedGameSettings().sound.volume,
  });

  useEffect(() => {
    console.log('Setting sound (useEffect)', state.soundVolume / 10);
    Howler.volume(state.soundVolume / 10);
  }, [state.soundVolume]);

  return (
    <GameSettingsContext.Provider
      value={{
        settings: state,
        updateSettings: updatedSettings => {
          const settings = { ...state, ...updatedSettings };
          setState(settings);
          saveGameSettings({ sound: { volume: settings.soundVolume } });
        },
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export function useGameSettingsProvider() {
  const context = React.useContext(GameSettingsContext);
  if (context === undefined) {
    throw new Error(
      'useGameSettingsProvider must be used within a GameSettingsProvider'
    );
  }
  return context;
}
