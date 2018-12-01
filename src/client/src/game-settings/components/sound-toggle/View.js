import React, { useContext } from 'react';
import GameSettingsContext from '../../../contexts/GameSettingsContext';
import {Button} from '../../../screens/styled';

const View = () => {

  const gameSettings = useContext(GameSettingsContext);
  const musicEnabledSetting = gameSettings.musicEnabled;

  const toggleMusic = () => {
    musicEnabledSetting.set(!musicEnabledSetting.value);
  };

  return (
    <Button type="button" onClick={toggleMusic}>
      {musicEnabledSetting.value ? 'sound off' : 'sound on'}<br/>
      {musicEnabledSetting.value ? '發聲' : '聲音'}
    </Button>
  );
};

export default View;
