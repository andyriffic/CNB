import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { hingeAnimation } from '../../../../../../uplift/components/animations';

const Container = styled.div<{
  tugging: boolean;
  falling: boolean;
  direction: 'left' | 'right';
}>`
  transition: transform 300ms ease-in;
  animation-fill-mode: both;
  ${({ tugging, direction }) =>
    tugging && direction === 'left' && 'transform: skew(15deg, 15deg);'}
  ${({ tugging, direction }) =>
    tugging && direction === 'right' && 'transform: skew(-15deg, -15deg);'}
  ${({ falling }) =>
    falling &&
    css`
      animation: ${hingeAnimation} 1000ms both;
    `}
`;

type Props = {
  tugging: boolean;
  direction: 'left' | 'right';
  fall?: boolean;
  children: ReactNode;
};

export const TugAnimation: FC<Props> = ({
  tugging,
  fall = false,
  direction,
  children,
}: Props) => {
  return (
    <Container tugging={tugging} falling={fall} direction={direction}>
      {children}
    </Container>
  );
};
