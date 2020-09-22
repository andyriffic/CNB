import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { shakeAndGrowAnimation } from '../../../uplift/components/animations';
import fireImage from './assets/fire.gif';

const fuseAnimation = css`
  animation: ${shakeAndGrowAnimation} 300ms ease-in-out infinite;
`;

const Container = styled.div<{ intensity: number; fuse: boolean }>`
  width: 5vw;
  height: 5vw;
  font-size: 3rem;
  ${({ fuse }) => fuse && fuseAnimation}
  
  /* ${({ intensity }) =>
    css`
      transform: scale(${1 + intensity / 10});
    `}; */
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
    <Container intensity={intensity} fuse={triggerFuse}>
      {triggerExplosion ? '💥' : '💣'}
      {triggerExplosion && <Flames src={fireImage} />}
    </Container>
  );
};
