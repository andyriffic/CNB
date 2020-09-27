import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { shakeAndGrowAnimation } from '../../../../uplift/components/animations';
import fireImage from '../assets/fire.gif';

const fuseAnimation = css`
  animation: ${shakeAndGrowAnimation} 300ms ease-in-out infinite;
`;

const Container = styled.div<{
  intensity: number;
}>`
  width: 5vw;
  height: 5vw;
  font-size: 3rem;
`;

const Icon = styled.div<{
  fuse: boolean;
  exploded: boolean;
  intensity: number;
}>`
  transition: transform 200ms ease-in-out;
  ${({ fuse }) => fuse && fuseAnimation}
  ${({ exploded, intensity }) =>
    css`
      transform: scale(${exploded ? '3' : intensity / 10 + 1});
    `}
`;

const Flames = styled.img`
  width: 20vw;
  height: 35vh;
  position: absolute;
  top: -35vh;
  left: -10vw;
`;

type TimebombProps = {
  triggerFuse: boolean;
  triggerExplosion: boolean;
  intensity: number;
};

export const Timebomb = ({
  triggerFuse,
  triggerExplosion,
  intensity,
}: TimebombProps) => {
  return (
    <Container intensity={intensity}>
      {triggerExplosion && <Flames src={fireImage} />}
      <Icon
        fuse={triggerFuse}
        exploded={triggerExplosion}
        intensity={intensity}
      >
        {triggerExplosion ? '💥' : '💣'}
      </Icon>
    </Container>
  );
};
