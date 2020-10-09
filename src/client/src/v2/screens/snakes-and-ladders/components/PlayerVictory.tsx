import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { StampText } from '../../../../uplift/components/stamp-text';

const MoveAndGrowAnimation = keyframes`
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(3) translate(-500px, -500px); }
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

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export const PlayerVictory = ({ show, children }: Props) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (show) {
      // soundService.play(JUNGLE_SOUND_KEYS.VICTORY);
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
      </div>
    </Container>
  );
};
