import React from 'react';
import styled, { css } from 'styled-components';
import { spinAnimation } from '../../../../uplift/components/animations';
import { throwSpeed } from '../providers/BarrelProvider';

const PositionedContainer = styled.div<{
  x: number;
  y: number;
  throwing: boolean;
}>`
  position: absolute;
  transition: all ${throwSpeed}ms ease-in-out;
  left: ${props => `${props.x - 15}px`};
  top: ${props => `${props.y - 60}px`};
  ${({ throwing }) =>
    throwing &&
    css`
      animation: ${spinAnimation} 4000ms linear infinite;
    `}
`;

type Props = {
  position: [number, number];
  throwing: boolean;
  children: React.ReactNode;
};

export const PositionedBarrel = ({ position, throwing, children }: Props) => {
  return (
    <PositionedContainer throwing={throwing} x={position[0]} y={position[1]}>
      {children}
    </PositionedContainer>
  );
};
