import React, { useContext } from 'react';
import GameSettingsContext from '../../../contexts/GameSettingsContext';
import styled from 'styled-components';

const Button = styled.button`
  margin: 0;
`;

const View = () => {

  const gameSettings = useContext(GameSettingsContext);
  const musicEnabledSetting = gameSettings.musicEnabled;

  const toggleMusic = () => {
    musicEnabledSetting.set(!musicEnabledSetting.value);
  };

  return (<Button type="button" onClick={toggleMusic}>music {musicEnabledSetting.value ? 'off' : 'on'}</Button>);
};

export default View;
