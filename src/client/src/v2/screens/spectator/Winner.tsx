import React, { useEffect } from 'react';
import styled from 'styled-components';
import powerStar from './power-star.gif';
import { RainbowText } from '../../../uplift/components/RainbowText';
import { shakeAnimationLeft } from '../../../uplift/components/animations';

const Container = styled.div`
  width: 5vw;
  height: 5vw;
  background-color: transparent;
  animation: ${shakeAnimationLeft} 500ms infinite;
`;

type Props = {
  onComplete: () => void;
};

export const Winner = ({ onComplete }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  }, []);

  return (
    <Container>
      <RainbowText>WINNER!</RainbowText>
    </Container>
  );
};
