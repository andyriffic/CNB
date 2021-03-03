import React, { useEffect } from 'react';
import styled from 'styled-components';
import { inOutAnimation } from '../../uplift/components/animations';

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
  pointer-events: none;
  /* z-index: 100; */
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.feature};
  font-size: 5rem;
  color: ${({ theme }) => theme.color.text01};
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: ${({ theme }) => theme.color.border01};
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
