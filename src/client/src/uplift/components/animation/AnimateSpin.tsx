import React from 'react';
import styled, { css } from 'styled-components';
import { rotateAnimation } from '../animations';

const Container = styled.div<{ play: boolean }>`
  ${props =>
    props.play &&
    css`
      animation: ${rotateAnimation} 5s linear 300ms infinite;
    `}
`;

type Props = {
  children: React.ReactNode;
  play: boolean;
};

export const AnimateSpin = ({ children, play }: Props) => {
  return <Container play={play}>{children}</Container>;
};
