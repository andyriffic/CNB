import React from 'react';
import styled from 'styled-components';
import { GameBoardCellWithPlayers } from '../types';

const positionedPlayerOffsets: [number, number][] = [
  [0, 0],
  [-25, 0],
  [25, 0],
  [-35, 40],
  [-10, 40],
  [15, 40],
];

const PositionedContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  transition: all 500ms ease-in-out;
  left: ${props => `${props.x - 15}px`};
  top: ${props => `${props.y - 60}px`};
`;

type Props = {
  playerId: string;
  cell: GameBoardCellWithPlayers;
  children: React.ReactNode;
};

export const PositionedPlayer = ({ playerId, cell, children }: Props) => {
  const offset = cell.players.findIndex(c => c.player.id === playerId);
  const positionOffset: [number, number] =
    positionedPlayerOffsets[offset] || positionedPlayerOffsets[0];

  return (
    <PositionedContainer
      x={cell.coordinates[0] + positionOffset[0]}
      y={cell.coordinates[1] + positionOffset[1]}
    >
      {children}
    </PositionedContainer>
  );
};
