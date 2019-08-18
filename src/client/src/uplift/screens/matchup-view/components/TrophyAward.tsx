import React from 'react';
import styled, { keyframes } from 'styled-components';

const Grow = keyframes`
  0% { transform: scale(0.2); }
  100% { transform: scale(1); }
`;

const Glow = keyframes`
  0% { text-shadow: 0 0 5px white, 0 0 10px yellow; }
  50% { text-shadow: 0 0 60px white, 0 0 10px yellow; }
  100% { text-shadow: 0 0 5px white, 0 0 10px yellow; }
`;

const Container = styled.div`
  display: flex;
  animation: ${Grow} 5s linear;
`;

const Trophy = styled.div`
  font-size: 3rem;
  line-height: 1;
  animation: ${Glow} 3s linear infinite;
`;

type TrophyAwardProps = {};

export const TrophyAward = ({  }: TrophyAwardProps) => {
  return (
    <Container>
      <Trophy>🏆</Trophy>
    </Container>
  );
};
