import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { SoundService } from '../../../contexts/types';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import { Timebomb } from './Timebomb';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TeamContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const Bomb = styled.div<{ position: 'LEFT' | 'RIGHT' }>`
  position: relative;
  font-size: 2rem;
  transition: left 500ms ease-in-out;
  ${props => props.position === 'LEFT' && 'left: -300px;'}
  ${props => props.position === 'RIGHT' && 'left: 300px;'}
`;

type TimebombStripProps = {
  playerWithTimebombIndex: number;
  run: boolean;
  exploded: boolean;
  intensity: number;
  onComplete: () => void;
};

export const TimebombStrip = ({
  playerWithTimebombIndex,
  onComplete,
  run,
  exploded,
  intensity,
}: TimebombStripProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  // useEffect(() => {
  //   soundService.play(SOUND_KEYS.TICKING);
  //   return () => {
  //     soundService.stop(SOUND_KEYS.TICKING);
  //   };
  // }, []);

  return (
    <Container className="margins-off">
      <Bomb position={playerWithTimebombIndex === 0 ? 'LEFT' : 'RIGHT'}>
        <Timebomb
          exploded={exploded && run}
          ticking={!exploded && run}
          intensity={intensity}
          onComplete={() => {
            onComplete();
          }}
        />
      </Bomb>
    </Container>
  );
};
