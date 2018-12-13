import React, { useContext } from 'react';
import GameSettingsContext from '../../../contexts/GameSettingsContext';
import { Button } from '../../../screens/styled';
import styled from 'styled-components'

const Heading = styled.h4`
  margin: 0;
`;

const RadioItem = styled.div`
  width: 130px;
  height: 50px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  transition: all 0.25s linear;
  padding-left: 30px;
`;

const Radio = styled.input`
  position: absolute;
  visibility: hidden;
  width: 100%;
  height: 100%;

  &:checked ~ .check {
    background-color: steelblue;
  }
`;

const Check = styled.div`
  width: 20px;
  height: 20px;
  background-color: lightgrey;
  border-radius: 50%;
  transition: all 300ms linear;
  position: absolute;
  top: 10px;
  left: 0;
`;

const View = () => {

  const gameSettings = useContext(GameSettingsContext);
  const musicEnabledSetting = gameSettings.musicEnabled;

  const toggleMusic = (value) => {
    musicEnabledSetting.set(value);
  };

  return (
    <React.Fragment>
      <Heading>Sound 聲音</Heading>

      <div style={{ display: 'flex' }}>
        <RadioItem>
          <Radio type="radio" id="soundOn" name="sound" checked={musicEnabledSetting.value} onChange={() => toggleMusic(true)} />
          <Label for="soundOn">ON 上</Label>
          <Check className="check" />
        </RadioItem>

        <RadioItem>
          <Radio type="radio" id="soundOff" name="sound" checked={!musicEnabledSetting.value} onChange={() => toggleMusic(false)} />
          <Label for="soundOff">OFF 離</Label>
          <Check className="check" />
        </RadioItem>

        {/* <Button type="button" onClick={toggleMusic}>
          {musicEnabledSetting.value ? 'sound off' : 'sound on'}<br />
          {musicEnabledSetting.value ? '發聲' : '聲音'}
        </Button> */}
      </div>
    </React.Fragment>
  );
};

export default View;
