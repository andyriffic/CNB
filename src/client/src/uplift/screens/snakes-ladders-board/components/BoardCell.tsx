import React from 'react';
import styled, { css } from 'styled-components';
import { GameBoardCell, BOARD_CELL_TYPE } from '../types';
import { isFeatureEnabled } from '../../../../featureToggle';

export const gameBoardDebug = isFeatureEnabled('debug');

const Toadstool = styled.div`
  font-size: 2.2rem;
  position: relative;
  top: -34px;
  left: -20px;
`;

const Cell = styled.div<{ x: number; y: number }>`
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

const DebugText = styled.span`
  background-color: white;
  color: blue;
  font-size: 0.8rem;
`;

type Props = {
  cell: GameBoardCell;
};

export const BoardCell = ({ cell }: Props) => {
  return (
    <Cell x={cell.coordinates[0]} y={cell.coordinates[1]}>
      {gameBoardDebug && <DebugText>{cell.number}</DebugText>}
      {gameBoardDebug && cell.type === BOARD_CELL_TYPE.LADDER && (
        <DebugText>⬆({cell.linkedCellIndex})</DebugText>
      )}
      {gameBoardDebug && cell.type === BOARD_CELL_TYPE.SNAKE && (
        <DebugText>⬇({cell.linkedCellIndex})</DebugText>
      )}
      {cell.fairy && <Toadstool>🍄</Toadstool>}
    </Cell>
  );
};
