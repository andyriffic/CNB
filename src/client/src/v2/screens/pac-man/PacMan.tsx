import React from 'react';
import styled, { keyframes } from 'styled-components';

const mouthAnimation = keyframes`
0% {
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  }
  25% {
    clip-path: polygon(100% 60%, 44% 48%, 100% 40%);
  }
  
  50% {
    clip-path: polygon(100% 50%, 44% 48%, 100% 50%);
  }
  
  75% {
   clip-path: polygon(100% 59%, 44% 48%, 100% 35%);
  }
  
  100% {
   clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  }
`;

const Container = styled.div`
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: #f2d648;
  position: relative;
`;

const Mouth = styled.div`
  background: #000;
  position: absolute;
  width: 101%;
  height: 101%;
  clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  animation-name: ${mouthAnimation};
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
`;

export function PacMan(): JSX.Element {
  return (
    <Container>
      <Mouth />
    </Container>
  );
}
