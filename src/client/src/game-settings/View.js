import React, { useState, useContext } from 'react';
import GameSettingsContext from '../contexts/GameSettingsContext';
import GameSoundContext from '../contexts/GameSoundContext';

const View = ({ children }) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const soundService = useContext(GameSoundContext);
  soundService.setMusicEnabled(musicEnabled);

  const gameSettings = {
    musicEnabled: {
      value: musicEnabled,
      set: value => {
        setMusicEnabled(value);
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
