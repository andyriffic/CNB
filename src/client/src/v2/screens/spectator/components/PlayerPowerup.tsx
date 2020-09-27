import React from 'react';
import styled from 'styled-components';
import powerStar from './power-star.gif';
import { RainbowText } from '../../../../uplift/components/RainbowText';
import { shakeAnimationLeft } from '../../../../uplift/components/animations';
import { PowerupBadge } from '../../../../uplift/components/PowerupBadge';

const Container = styled.div`
  width: 3vw;
  height: 3vw;
  background-color: transparent;
  transform: scale(0.6);
  /* animation: ${shakeAnimationLeft} 500ms infinite; */
`;

type Props = {
  powerupUsed: boolean;
  powerupId?: string;
  reveal: boolean;
};

export const PlayerPowerup = ({ powerupUsed, powerupId, reveal }: Props) => {
  if (!powerupUsed) {
    return null;
  }
  return (
    <Container>
      <PowerupBadge powerupName={reveal ? powerupId || '' : 'MYSTERY'} />
    </Container>
  );
};
