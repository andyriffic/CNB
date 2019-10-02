import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { SoundService } from '../../../contexts/types';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';

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

type TimebombProps = {
  exploded: boolean;
  ticking: boolean;
  onComplete: () => void;
};

export const Timebomb = ({ exploded, ticking, onComplete }: TimebombProps) => {
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
        {!ticking && !exploded && '💣'}
      </Bomb>
    </Container>
  );
};
