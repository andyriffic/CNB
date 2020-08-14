import React from 'react';
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
  powerupUsed: boolean;
  powerupId?: string;
};

export const PlayerPowerup = ({ powerupUsed }: Props) => {
  if (!powerupUsed) {
    return null;
  }
  return (
    <Container>
      <RainbowText>POWERUP!</RainbowText>
      {/* <img src={powerStar} style={{ width: '100%', height: '100%' }} /> */}
    </Container>
  );
};
