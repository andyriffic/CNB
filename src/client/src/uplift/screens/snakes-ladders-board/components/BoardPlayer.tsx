import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GameBoardCell } from '../board';
import { Player } from '../../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../../components/PlayerAvatar';
import Rainbow from '../../../../components/rainbow-text';
import { pulseAnimation } from '../../../components/animations';

const CellPlayer = styled.div<{ x: number; y: number }>`
  box-sizing: border-box;
  position: absolute;
  transition: all 1s ease-in-out;
  left: ${props => `${props.x - 15}px`};
  top: ${props => `${props.y - 60}px`};
`;

const MovesRemaining = styled.div`
  font-family: 'Rammetto One';
  position: absolute;
  top: -60px;
  left: 15px;
  animation: ${pulseAnimation} 1000ms ease-in-out 0s infinite;
`;

type Props = {
  cell: GameBoardCell;
  movesRemaining: number;
  player: Player;
  onClick: () => void;
  onArrived: () => void;
};

export const BoardPlayer = ({
  cell,
  movesRemaining,
  player,
  onClick,
  onArrived,
}: Props) => {
  useEffect(() => {
    setTimeout(onArrived, 1000);
  }, [cell]);
  return (
    <CellPlayer
      onClick={onClick}
      x={cell.coordinates[0]}
      y={cell.coordinates[1]}
    >
      <div style={{ position: 'relative' }}>
        <PlayerAvatar
          player={player}
          overrideStyle="width: 30px; height: 60px;"
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
