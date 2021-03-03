type GameSettings = {
  sound: {
    volume: number;
  };
};

const defaultSettings: GameSettings = {
  sound: {
    volume: 1,
  },
};

const LOCAL_STORAGE_KEY = 'CNB-V2';

const setGameSettings = (gameSettings: GameSettings) => {
  const serialisedSettings = JSON.stringify(gameSettings);
  localStorage.setItem(LOCAL_STORAGE_KEY, serialisedSettings);
};

export const getSavedGameSettings = (): GameSettings => {
  const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedSettings) {
    console.log('[Settings]: Returning default settings');

    return defaultSettings;
  }

  const parsedSettings = JSON.parse(savedSettings) as GameSettings;
  console.log('[Settings]: parsed settings', parsedSettings);

  return {
    ...defaultSettings,
    ...parsedSettings,
  };
};

export const saveGameSettings = (gameSetting: Partial<GameSettings>) => {
  const currentSettings = getSavedGameSettings();

  const settings = {
    ...currentSettings,
    ...gameSetting,
  };

  setGameSettings(settings);
  return settings;
};
