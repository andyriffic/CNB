// flow:disable no typedefs for useState, useEffect yet
import React, { useState, useContext } from 'react';
import GameSettingsContext from '../contexts/GameSettingsContext';
import GameSoundContext from '../contexts/GameSoundContext';
import { getGameSettings, setGameSetting } from '../storage';

const View = ({ children }) => {
  const [savedGameSettings, setSavedGameSettings] = useState(getGameSettings());
  const soundService = useContext(GameSoundContext);
  soundService.setMusicEnabled(savedGameSettings.soundOn);

  const gameSettings = {
    musicEnabled: {
      value: savedGameSettings.soundOn,
      set: value => {
        setSavedGameSettings(setGameSetting({ soundOn: value }));
        soundService.setMusicEnabled(value); // pass setting into music service
      },
    },
  };

  return (
    <GameSettingsContext.Provider value={gameSettings}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export default View;
