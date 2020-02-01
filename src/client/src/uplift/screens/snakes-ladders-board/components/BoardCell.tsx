import React from 'react';
import styled from 'styled-components';
import { GameBoardCell } from '../board';

const Cell = styled.div<{ x: number; y: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: greenyellow;
  position: absolute;
  left: ${props => `${props.x}px`};
  top: ${props => `${props.y}px`};
`;

type Props = {
  cell: GameBoardCell;
};

export const BoardCell = ({ cell }: Props) => {
  return (
    <Cell x={cell.coordinates[0]} y={cell.coordinates[1]}>
      {cell.number}
    </Cell>
  );
};
