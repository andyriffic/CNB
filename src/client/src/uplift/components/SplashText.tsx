import React, { useEffect } from 'react';
import styled from 'styled-components';
import { featureFontFamily } from './layouts/FullPageScreenLayout';
import { inOutAnimation } from './animations';

const ANIMATION_DURATION_MILLISECONDS = 2500;

const Container = styled.div`
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-family: ${featureFontFamily};
  font-size: 5rem;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: black;
  animation: ${inOutAnimation} ${ANIMATION_DURATION_MILLISECONDS}ms ease-in-out
    both;
`;

type Props = {
  children: React.ReactNode;
  onComplete?: () => void;
};

export const SplashText = ({ children, onComplete }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete && onComplete();
    }, ANIMATION_DURATION_MILLISECONDS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
};
