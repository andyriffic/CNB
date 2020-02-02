import React from 'react';
import styled, { css } from 'styled-components';
import { GameBoardCell, gameBoardDebug, BOARD_CELL_TYPE } from '../board';

const Cell = styled.div<{ x: number; y: number }>`
  color: blue;
  font-size: 0.8rem;
  ${gameBoardDebug &&
    css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: greenyellow;
    `}

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
      {gameBoardDebug && cell.number}
      {gameBoardDebug &&
        cell.type === BOARD_CELL_TYPE.LADDER &&
        `⬆(${cell.linkedCellIndex})`}
      {gameBoardDebug &&
        cell.type === BOARD_CELL_TYPE.SNAKE &&
        `⬇(${cell.linkedCellIndex})`}
    </Cell>
  );
};
