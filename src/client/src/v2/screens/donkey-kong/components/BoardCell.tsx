import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { GameBoardCell, BOARD_CELL_TYPE } from '../types';
import { isFeatureEnabled } from '../../../../featureToggle';
import vortexImage from '../assets/vortex.png';
import { rotateAnimation } from '../../../../uplift/components/animations';
import { WormholeGroup } from '../boards/donkeyBoard';

export const gameBoardDebug = isFeatureEnabled('debug');

const Wormhole = styled.img`
  width: 70px;
  display: block;
  position: relative;
  top: -30px;
  left: -30px;
  animation: ${rotateAnimation} 10s linear infinite;
`;

const Cherry = styled.div`
  font-size: 2rem;
  position: relative;
  top: -60px;
  left: -30px;
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

const SafeText = styled.span`
  display: inline-block;
  border: 2px solid darkgreen;
  background-color: green;
  color: white;
  font-size: 0.5rem;
  text-transform: uppercase;
  position: relative;
  top: 10px;
  left: -17px;
  padding: 2px 6px;
`;

type Props = {
  cell: GameBoardCell;
};

/*
saturate(4) hue-rotate(-0.25turn)
*/

const wormholeVariants: JSX.Element[] = [
  <Wormhole src={vortexImage} />,
  <div style={{ filter: 'saturate(4) hue-rotate(-0.25turn)' }}>
    <Wormhole src={vortexImage} />
  </div>,
  <div style={{ filter: 'saturate(4) hue-rotate(0.25turn)' }}>
    <Wormhole src={vortexImage} />
  </div>,
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

export const BoardCell = ({ cell }: Props) => {
  return (
    <Cell x={cell.coordinates[0]} y={cell.coordinates[1]}>
      {gameBoardDebug && <DebugText>{cell.number}</DebugText>}
      {cell.type === BOARD_CELL_TYPE.END && <Cherry>🍒</Cherry>}
      {cell.type === BOARD_CELL_TYPE.SAFE && <SafeText>safe</SafeText>}
    </Cell>
  );
};
