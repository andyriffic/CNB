import React, { useState } from 'react';
import styled from 'styled-components';
import { useGameSettingsProvider } from '../providers/GameSettingsProvider';

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  padding: 10px;
  box-shadow: 2px 0 5px -2px rgba(136, 136, 136, 0.8);
  background-color: #eee;
  border-radius: 0 0 10px 0;

  transition: transform 200ms linear;
  transform: translateY(${({ open }) => (open ? '0' : '-100%')});

  input[type='number'] {
    width: 50px;
    font-size: ${({ theme }) => theme.fontSize.medium};
  }
`;

const SettingsContainer = styled.div``;

const Toggle = styled.div`
  width: 50px;
  height: 20px;
  background-color: teal;
  position: relative;
  top: 20px;
  cursor: pointer;
`;

const SoundHeading = styled.h4`
  padding: 0;
  margin: 0;
  font-size: 0.3rem;
  text-transform: uppercase;
`;

export const GameSettings = () => {
  const {
    settings: { soundVolume },
    updateSettings,
  } = useGameSettingsProvider();
  const [open, setOpen] = useState(false);
  return (
    <Container open={true}>
      <SettingsContainer>
        <SoundHeading>Sound</SoundHeading>
        <button
          onClick={() => updateSettings({ soundVolume: 0 })}
          style={{ backgroundColor: soundVolume === 0 ? '#999' : '#ccc' }}
        >
          Off
        </button>
        <button
          onClick={() => updateSettings({ soundVolume: 1 })}
          style={{ backgroundColor: soundVolume !== 0 ? '#999' : '#ccc' }}
        >
          On
        </button>
        {/* <input
          type="range"
          id="points"
          onChange={e =>
            updateSettings({ soundVolume: parseInt(e.target.value) })
          }
          value={soundVolume}
          min={0}
          max={10}
          step={1}
        ></input> */}
      </SettingsContainer>
      {/* <Toggle onClick={() => setOpen(!open)} /> */}
    </Container>
  );
};
