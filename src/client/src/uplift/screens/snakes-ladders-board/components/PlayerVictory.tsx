import React, { useEffect, useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import {
  SoundService,
  JUNGLE_SOUND_KEYS,
  SOUND_KEYS,
} from '../../../../sounds/SoundService';
import { useDoOnce } from '../../../hooks/useDoOnce';
import { Heading } from '../../../../components/form/radio-select/styles';
import { MainHeading } from '../../../components/Heading';
import { StampText } from '../../../components/stamp-text';

const MoveAndGrowAnimation = keyframes`
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(4) translate(-100px, 0); }
`;

const Container = styled.div`
  z-index: 9000;
  position: absolute;
  animation: ${MoveAndGrowAnimation} 7s ease-in-out 0s 1 both;
`;

const ChildrenContainer = styled.div`
  /* position: absolute; */
  /* animation: ${MoveAndGrowAnimation} 1s ease-in-out 0s 1 both; */
`;

const WinnerText = styled.div`
  position: absolute;
  left: 160px;
  top: 30px;
  z-index: 2;
`;

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export const PlayerVictory = ({ show, children }: Props) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (show) {
      soundService.play(JUNGLE_SOUND_KEYS.VICTORY);
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShowText(true);
      }, 7000);
    }
  }, [show]);

  if (!show) return <>{children}</>;

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <ChildrenContainer>{children}</ChildrenContainer>
        <WinnerText>
          <StampText
            show={showText}
            text="Ruler of the jungle!"
            style="jungle"
          />
        </WinnerText>
      </div>
    </Container>
  );
};
