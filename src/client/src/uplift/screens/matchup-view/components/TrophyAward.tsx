import React from 'react';
import styled, { keyframes } from 'styled-components';

const Pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Grow = keyframes`
  0% { transform: scale(0.2); }
  100% { transform: scale(1); }
`;

const Rotate = keyframes`
  0% { transform: rotate3d(0); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  animation: ${Pulse} 3s linear 5s infinite, ${Grow} 5s linear;
`;

const Trophy = styled.div`
  font-size: 3rem;
  line-height: 1;
`;

type TrophyAwardProps = {};

export const TrophyAward = ({  }: TrophyAwardProps) => {
  return (
    <Container>
      <Trophy>🏆</Trophy>
    </Container>
  );
};
