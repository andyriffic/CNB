import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PacManUiState } from './hooks/usePacman/reducer';

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
  position: relative;
`;

const Head = styled.div`
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: #f2d648;
  position: relative;
  transform: scaleX(-1);
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

const MovesRemaining = styled.div`
  position: absolute;
  bottom: -15%;
  left: 15%;
  padding: 0.1rem;
  background: black;
  border-radius: 50%;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: yellow;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  font-size: 0.6rem;
`;

type Props = {
  state: PacManUiState;
};

export function PacMan({ state }: Props): JSX.Element {
  return (
    <Container>
      <Head>
        <Mouth />
      </Head>
      {state.pacMan.movesRemaining > 0 && (
        <MovesRemaining>{state.pacMan.movesRemaining}</MovesRemaining>
      )}
    </Container>
  );
}
