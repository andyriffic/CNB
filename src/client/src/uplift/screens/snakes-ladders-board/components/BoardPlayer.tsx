import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GameBoardCell } from '../board';
import { Player } from '../../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../../components/PlayerAvatar';
import Rainbow from '../../../../components/rainbow-text';
import {
  pulseAnimation,
  bounceInAnimation,
  shakeAnimationRight,
  shakeAnimationLeft,
} from '../../../components/animations';

const offsets = [[0, 0], [-25, 0], [25, 0], [-35, 40], [-10, 40], [15, 40]];

const CellPlayer = styled.div<{
  x: number;
  y: number;
  priority: number;
  offset: number;
  hasMoves: boolean;
  inLead: boolean;
}>`
  box-sizing: border-box;
  position: absolute;
  transition: all 1s ease-in-out;
  left: ${props => `${props.x - 15}px`};
  top: ${props => `${props.y - 60}px`};
  z-index: ${props => props.priority + props.offset};
  pointer-events: ${props => (props.priority ? 'auto' : 'none')};
  ${props =>
    props.hasMoves &&
    css`
      animation: ${bounceInAnimation} 1000ms ease-in-out 0s infinite;
    `}

  ${props =>
    props.inLead &&
    css`
      animation: ${shakeAnimationLeft} 2s ease-in-out infinite;
    `}

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const MovesRemaining = styled.div`
  font-family: 'Rammetto One';
  position: absolute;
  top: -60px;
  left: 15px;
  /* animation: ${bounceInAnimation} 1000ms ease-in-out 0s infinite; */
`;

type Props = {
  cell: GameBoardCell;
  movesRemaining: number;
  offset: number;
  player: Player;
  onClick: () => void;
  onArrived: () => void;
  inLead: boolean;
};

export const BoardPlayer = ({
  cell,
  movesRemaining,
  offset,
  player,
  onClick,
  onArrived,
  inLead,
}: Props) => {
  useEffect(() => {
    setTimeout(onArrived, 1000);
  }, [cell]);

  const appliedOffset = offsets[offset] || [0, 0];

  return (
    <CellPlayer
      onClick={onClick}
      hasMoves={movesRemaining > 0}
      priority={movesRemaining}
      offset={offset}
      x={cell.coordinates[0] + appliedOffset[0]}
      y={cell.coordinates[1] + appliedOffset[1]}
      inLead={inLead}
    >
      <div style={{ position: 'relative' }}>
        <PlayerAvatar
          player={player}
          overrideStyle="width: 50px; height: 75px;"
        />
        {!!movesRemaining && (
          <MovesRemaining>
            <Rainbow>{movesRemaining}</Rainbow>
          </MovesRemaining>
        )}
      </div>
    </CellPlayer>
  );
};
