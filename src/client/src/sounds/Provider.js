import React, { useContext } from 'react';
import GameSoundContext from '../contexts/GameSoundContext';
import {SoundService} from './SoundService';
import GameThemeContext from '../contexts/GameThemeContext';

const View = ({ children }) => {

  const theme = useContext(GameThemeContext);
  const soundService = new SoundService(theme);

  return (
    <GameSoundContext.Provider value={soundService}>
      {children}
    </GameSoundContext.Provider>
  );
};

export default View;
