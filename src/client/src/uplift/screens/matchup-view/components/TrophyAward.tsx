import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ConfettiContext } from '../../../contexts/ConfettiProvider';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import { SoundService } from '../../../contexts/types';

const Grow = keyframes`
  0% { transform: scale(0.2); }
  100% { transform: scale(1); }
`;

const Glow = keyframes`
  0% { text-shadow: 0 0 5px white, 0 0 10px yellow; }
  50% { text-shadow: 0 0 60px white, 0 0 10px yellow; }
  100% { text-shadow: 0 0 5px white, 0 0 10px yellow; }
`;

const Container = styled.div`
  display: flex;
  animation: ${Grow} 5s linear;
`;

const Trophy = styled.div`
  font-size: 3rem;
  line-height: 1;
  animation: ${Glow} 3s linear infinite;
`;

type TrophyAwardProps = {};

export const TrophyAward = ({  }: TrophyAwardProps) => {
  const { setConfettiOn } = useContext(ConfettiContext);
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfettiOn(true);
      soundService.play(SOUND_KEYS.CROWD_CHEER);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      setConfettiOn(false);
      soundService.stop(SOUND_KEYS.CROWD_CHEER);
    };
  }, []);

  return (
    <Container>
      <Trophy>🏆</Trophy>
    </Container>
  );
};
