import React from 'react';
import styled, { css } from 'styled-components';
import { fadeInAnimation } from '../animations';

const Container = styled.div<{ play: boolean }>`
  ${props =>
    props.play &&
    css`
      animation: ${fadeInAnimation} 2000ms linear 0s both;
    `}
`;

type Props = {
  children: React.ReactNode;
  play: boolean;
};

export const AnimateFadeIn = ({ children, play }: Props) => {
  return <Container play={play}>{children}</Container>;
};
