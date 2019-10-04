import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { SoundService } from '../../../contexts/types';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import {BombImage} from './BombImage';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Bomb = styled.div<{ exploded: boolean }>`
  position: relative;
  font-size: 2rem;
  transition: transform 200ms ease-in-out;
  ${props => props.exploded && 'transform: scale(5);'}
`;


const BombImageContainer = styled.div<{intensity: number}>`
transition: width 100ms ease-in-out, height 100ms ease-in-out;
  width: ${props => props.intensity * 5 + 50}px;
  height: ${props => props.intensity * 5 + 50}px;

  #bomb-body {
    fill: red;
  }
`;


type TimebombProps = {
  exploded: boolean;
  ticking: boolean;
  intensity: number;
  onComplete: () => void;
};

export const Timebomb = ({ exploded, ticking, intensity = 1, onComplete }: TimebombProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const [boom, setBoom] = useState(false);

  useEffect(() => {
    setBoom(false);
    if (!exploded) {
      return;
    }

    soundService.play(SOUND_KEYS.FUSE);
    setTimeout(() => {
      soundService.play(SOUND_KEYS.EXPLOSION);
      setBoom(true);
      onComplete();
    }, 2000);
  }, [exploded]);

  useEffect(() => {
    ticking && soundService.play(SOUND_KEYS.FUSE);
    return () => {
      soundService.stop(SOUND_KEYS.FUSE);
    };
  }, [ticking]);

  useEffect(() => {
    if (!ticking) {
      return;
    }

    const tickingTimeout = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => {
      clearTimeout(tickingTimeout);
    };
  }, [ticking]);

  return (
    <Container className="margins-off">
      <Bomb exploded={boom}>
        {(ticking || exploded) && !boom && '😬'}
        {boom && '💥'}
        {/* {!ticking && !exploded && <BombImage src={bombImage} intensity={intensity} />} */}
        {!ticking && !exploded && <BombImageContainer intensity={intensity}><BombImage /></BombImageContainer>}
      </Bomb>
    </Container>
  );
};
