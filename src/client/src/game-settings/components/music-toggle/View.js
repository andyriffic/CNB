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
      {musicEnabledSetting.value ? 'music off' : 'music on'}<br/>
      {musicEnabledSetting.value ? '放音樂' : '音樂關閉'}
    </Button>
  );
};

export default View;
