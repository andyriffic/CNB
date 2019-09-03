import { DEFAULT_GAME_SETTINGS } from './defaultGameSettings';

const LOCAL_STORAGE_KEY = 'CNB';

const setGameSettings = gameSettings => {
  const serialisedSettings = JSON.stringify(gameSettings);
  localStorage.setItem(LOCAL_STORAGE_KEY, serialisedSettings);
};

export const getGameSettings = () => {
  const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedSettings) {
    return DEFAULT_GAME_SETTINGS;
  }

  const parsedSettings = JSON.parse(savedSettings);

  return {
    ...DEFAULT_GAME_SETTINGS,
    ...parsedSettings,
  };
};

export const setGameSetting = gameSetting => {
  const currentSettings = getGameSettings();

  const settings = {
    ...currentSettings,
    ...gameSetting,
  };

  setGameSettings(settings);
  return settings;
};
