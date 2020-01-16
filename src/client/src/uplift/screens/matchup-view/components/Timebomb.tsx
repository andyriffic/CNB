import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { SoundService } from '../../../contexts/types';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import {
  pulseAnimation,
  shakeAnimationLeft,
  bounceInAnimation,
} from '../../../components/animations';
import dumplingImage from './dumpling.gif';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const pulseCss = (intensity: number) => css`
  animation: ${bounceInAnimation} ${2000 / intensity}ms ease-in-out infinite;
  /* intensity}ms ease-in-out infinite; */
  /* filter: brightness(${intensity * 50}%); */
  filter: saturate(${intensity * 2});
`;

const shakeCss = css`
  animation: ${shakeAnimationLeft} 300ms ease-in-out infinite;
`;

const Dumpling = styled.img`
  width: 100px;
  height: 100px;
`;

const Bomb = styled.div<{
  exploded: boolean;
  intensity: number;
  ticking: boolean;
}>`
  position: relative;
  font-size: 2rem;
  transition: transform 200ms ease-in-out;
  ${props =>
    props.exploded
      ? 'transform: scale(5);'
      : props.ticking
      ? shakeCss
      : props.intensity > 1 && pulseCss(props.intensity)}
`;

type TimebombProps = {
  exploded: boolean;
  ticking: boolean;
  intensity: number;
  onComplete: () => void;
};

export const Timebomb = ({
  exploded,
  ticking,
  intensity = 1,
  onComplete,
}: TimebombProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const [boomCountdown, setBoomCountdown] = useState(false);
  const [boom, setBoom] = useState(false);

  useEffect(() => {
    setBoom(false);
    setBoomCountdown(false);
    if (!exploded) {
      return;
    }

    setBoomCountdown(true);
    soundService.play(SOUND_KEYS.FUSE);
    setTimeout(() => {
      soundService.stop(SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST);
      soundService.stop(SOUND_KEYS.TICKING);
      soundService.play(SOUND_KEYS.EXPLOSION);
      setBoomCountdown(false);
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
      <Bomb
        exploded={boom}
        intensity={intensity}
        ticking={ticking || boomCountdown}
      >
        {/* {(ticking || exploded) && !boom && '😬'} */}
        {boom && '💥'}
        {/* {!ticking && !exploded && <BombImage src={bombImage} intensity={intensity} />} */}
        {!boom && <Dumpling src={dumplingImage} alt="Dumpling" />}
      </Bomb>
    </Container>
  );
};
