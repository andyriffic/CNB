/* @flow */
import { DEFAULT_GAME_SETTINGS } from './defaultGameSettings';
import type { PersistantGameSettings } from './defaultGameSettings';

const LOCAL_STORAGE_KEY = 'CNB';

const setGameSettings = (gameSettings: PersistantGameSettings): void => {
  const serialisedSettings = JSON.stringify(gameSettings);
  localStorage.setItem(LOCAL_STORAGE_KEY, serialisedSettings);
};

export const getGameSettings = (): PersistantGameSettings => {
  const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedSettings) {
    return DEFAULT_GAME_SETTINGS;
  }

  return JSON.parse(savedSettings);
};

export const setGameSetting = (
  gameSetting: PersistantGameSettings
): PersistantGameSettings => {
  const currentSettings = getGameSettings();

  const settings = {
    ...currentSettings,
    ...gameSetting,
  };

  setGameSettings(settings);
  return settings;
};
