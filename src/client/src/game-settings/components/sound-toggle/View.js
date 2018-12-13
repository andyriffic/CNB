import React, { useContext } from 'react';
import GameSettingsContext from '../../../contexts/GameSettingsContext';
import RadioSelectList from '../../../components/form/radio-select';


const SoundOptions = [
  { id: 'soundOn', label: 'On 上', value: true },
  { id: 'soundOff', label: 'Off 離', value: false },
];

const View = () => {

  const gameSettings = useContext(GameSettingsContext);
  const musicEnabledSetting = gameSettings.musicEnabled;

  const toggleMusic = (value) => {
    musicEnabledSetting.set(value);
  };

  return (
    <RadioSelectList title="Sound 聲音"
      items={SoundOptions}
      selectedValue={musicEnabledSetting.value}
      onChange={toggleMusic} />

  );
};

export default View;
