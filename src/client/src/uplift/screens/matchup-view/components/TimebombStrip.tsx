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

const TeamContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const Bomb = styled.div<{ position: 'LEFT' | 'RIGHT' }>`
  position: relative;
  font-size: 2rem;
  transition: left 1000ms ease-in-out;
  ${props => props.position === 'LEFT' && 'left: -300px;'}
  ${props => props.position === 'RIGHT' && 'left: 300px;'}
`;

type TimebombStripProps = {
  playerWithTimebombIndex: number;
  run: boolean;
  exploded: boolean;
  onComplete: () => void;
};

export const TimebombStrip = ({
  playerWithTimebombIndex,
  onComplete,
  run,
  exploded,
}: TimebombStripProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showTicking, setShowTicking] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    soundService.play(SOUND_KEYS.TICKING);
    return () => {
      soundService.stop(SOUND_KEYS.TICKING);
    };
  }, []);

  useEffect(() => {
    if (run) {
      setTimeout(() => {
        setShowTicking(true);
      }, 1000);

      setTimeout(() => {
        setShowTicking(false);
        if (exploded) {
          soundService.stop(SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST);
          soundService.stop(SOUND_KEYS.TICKING);
          soundService.play(SOUND_KEYS.EXPLOSION);
        }
        setShowExplosion(true);
      }, 3000);

      setTimeout(() => {
        onComplete();
      }, 4000);
    } else {
      setShowExplosion(showExplosion && exploded);
      // setShowTicking(false);
    }
  }, [run, done]);

  return (
    <Container className="margins-off">
      <Bomb position={playerWithTimebombIndex === 0 ? 'LEFT' : 'RIGHT'}>
        {!showExplosion && '💣'}
        {showExplosion && exploded && '💥'}
        {showExplosion && !exploded && '😅'}
        {showTicking && <span>Tick, tick, tick</span>}
      </Bomb>
    </Container>
  );
};
