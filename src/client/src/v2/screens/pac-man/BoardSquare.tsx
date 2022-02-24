import React from 'react';
import styled from 'styled-components';
import { boardConfig } from './boardConfig';
import { Coordinates, PacManSquare } from './types';

const Container = styled.div<{ position: Coordinates }>`
  position: absolute;
  top: ${({ position }) => boardConfig.gridCoordinates.y[position.y]}%;
  left: ${({ position }) => boardConfig.gridCoordinates.x[position.x]}%;
  width: 5%;
  height: 5%;
  text-align: center;
  color: white;
`;

type Props = {
  square: PacManSquare;
};

export function BoardSquare({ square }: Props): JSX.Element {
  return <Container position={square.coordinates}>.</Container>;
}
