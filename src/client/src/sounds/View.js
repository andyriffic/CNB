import React, {useContext} from 'react';
import GameSoundContext from '../contexts/GameSoundContext';
import {SoundService} from './soundService';

const gameState = ({ children }) => {

  //const gameSettings = useContext(GameSettingsContext);
  const soundService = new SoundService(true);

  return (
    <GameSoundContext.Provider value={soundService}>
      {children}
    </GameSoundContext.Provider>
  );
};

export default gameState;
