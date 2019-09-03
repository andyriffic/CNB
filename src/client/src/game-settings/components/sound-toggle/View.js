import React, { useContext, useState } from 'react';
import GameSettingsContext from '../../../contexts/GameSettingsContext';
import RadioSelectList from '../../../components/form/radio-select';

const SoundOptions = [
  { id: 'soundOn', label: 'On 開', value: true },
  { id: 'soundOff', label: 'Off 關', value: false },
];

const View = () => {
  const gameSettings = useContext(GameSettingsContext);
  const musicEnabledSetting = gameSettings.musicEnabled;
  const soundVolumeSetting = gameSettings.soundVolume;

  const toggleMusic = value => {
    musicEnabledSetting.set(value);
  };

  const setVolume = volume => {
    soundVolumeSetting.set(volume);
  };

  return (
    <div>
      <RadioSelectList
        title="Sound 聲音"
        items={SoundOptions}
        selectedValue={musicEnabledSetting.value}
        onChange={toggleMusic}
      />
      <label>Volume</label>
      <input
        style={{ fontSize: '20px', padding: '5px' }}
        type="number"
        value={soundVolumeSetting.value}
        onChange={e => setVolume(e.target.value)}
        min="0"
        max="10"
      />
    </div>
  );
};

export default View;
