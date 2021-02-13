import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { GameBoardCell, BOARD_CELL_TYPE } from '../types';
import { isFeatureEnabled } from '../../../../featureToggle';
import vortexImage from '../assets/vortex.png';
import { rotateAnimation } from '../../../../uplift/components/animations';
import { WormholeGroup, wormholeGroups } from '../boards/chinese';

export const gameBoardDebug = isFeatureEnabled('debug');

const Wormhole = styled.img`
  width: 70px;
  display: block;
  position: relative;
  top: -30px;
  left: -30px;
  animation: ${rotateAnimation} 10s linear infinite;
`;

const Toadstool = styled.div`
  font-size: 2.2rem;
  position: relative;
  top: -34px;
  left: -20px;
`;

const Cell = styled.div<{ x: number; y: number }>`
  ${gameBoardDebug &&
    css`
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: red;
      border: 2px solid black;
    `}

  position: absolute;
  left: ${props => `${props.x}px`};
  top: ${props => `${props.y}px`};
`;

const DebugText = styled.span`
  background-color: white;
  color: black;
  font-size: 0.8rem;
  position: relative;
  top: 10px;
  left: -5px;
`;

type Props = {
  cell: GameBoardCell;
};

/*
saturate(4) hue-rotate(-0.25turn)
*/

const wormholeVariants: JSX.Element[] = [
  <Wormhole src={vortexImage} />,
  <span style={{ filter: 'saturate(4) hue-rotate(-0.25turn)' }}>
    <Wormhole src={vortexImage} />
  </span>,
  <span style={{ filter: 'saturate(4) hue-rotate(0.25turn)' }}>
    <Wormhole src={vortexImage} />
  </span>,
  <div
    style={{
      fontSize: '2.3rem',
      position: 'relative',
      top: '-40px',
      left: '-20px',
    }}
  >
    💩
  </div>,
];

const getWormholeVariant = (
  cell: GameBoardCell,
  wormholeGroups: WormholeGroup[]
): number => {
  if (cell.type !== BOARD_CELL_TYPE.WORMHOLE) {
    return 0;
  }

  const wormholeVariant = wormholeGroups.findIndex(
    g => g === cell.linkedCellIndex
  );
  if (wormholeVariant === -1) {
    return 0;
  }

  console.log('WORMHOLE GROUP', wormholeGroups[wormholeVariant], cell.number);

  if (!wormholeGroups[wormholeVariant].includes(cell.number)) {
    console.log('YUP!', cell.number);

    return wormholeVariants.length - 1;
  }

  return wormholeVariant;
};

export const BoardCell = ({ cell }: Props) => {
  const wormholeVariant = useRef(getWormholeVariant(cell, wormholeGroups));

  return (
    <Cell x={cell.coordinates[0]} y={cell.coordinates[1]}>
      {gameBoardDebug && <DebugText>{cell.number}</DebugText>}
      {gameBoardDebug && cell.type === BOARD_CELL_TYPE.LADDER && (
        <DebugText>⬆({cell.linkedCellIndex})</DebugText>
      )}
      {gameBoardDebug && cell.type === BOARD_CELL_TYPE.SNAKE && (
        <DebugText>⬇({cell.linkedCellIndex})</DebugText>
      )}
      {gameBoardDebug && cell.type === BOARD_CELL_TYPE.WORMHOLE && (
        <DebugText
          style={{ backgroundColor: 'steelblue', top: '40px', left: '-30px' }}
        >
          ⭐️(
          {typeof cell.linkedCellIndex === 'object' &&
            cell.linkedCellIndex.join(',')}
          )
        </DebugText>
      )}
      {cell.fairy && <Toadstool>🍄</Toadstool>}
      {cell.type === BOARD_CELL_TYPE.WORMHOLE &&
        wormholeVariants[wormholeVariant.current]}
    </Cell>
  );
};
