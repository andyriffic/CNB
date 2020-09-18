import React, { useContext } from 'react';
import GameSoundContext from '../contexts/GameSoundContext';
import { SoundService } from './SoundService';
import GameThemeContext from '../contexts/GameThemeContext';

const View = ({ children }) => {
  const soundService = new SoundService();

  return (
    <GameSoundContext.Provider value={soundService}>
      {children}
    </GameSoundContext.Provider>
  );
};

export default View;
