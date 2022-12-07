import React from 'react';
import styled from 'styled-components';
import santaHatImage from './assets/santa-hat.png';
import { PacManGhost } from './PacManGhost';

const Container = styled.div`
  position: relative;
`;

const SantaHat = styled.img`
  display: block;
  position: absolute;
  top: -46%;
  left: -28%;
  width: 120%;
`;

type Props = {
  color?: string;
  width?: number | string;
};

export const PacManGhostWithSantaHat = ({
  color = '#f00',
  width = 30,
}: Props) => {
  return (
    <Container>
      <SantaHat src={santaHatImage} alt="santa hat" />
      <PacManGhost color={color} width={width} />
    </Container>
  );
};
