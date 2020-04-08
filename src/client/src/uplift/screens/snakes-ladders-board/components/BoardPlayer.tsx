import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GameBoardPlayer } from '../GameBoardContext';
import { Player } from '../../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../../components/PlayerAvatar';
import Rainbow from '../../../../components/rainbow-text';
import {
  pulseAnimation,
  bounceInAnimation,
  shakeAnimationRight,
  shakeAnimationLeft,
} from '../../../components/animations';
import { GameBoardCell } from '../board';
import { PlayerVictory } from './PlayerVictory';

export const ANIMATION_TIMEOUT_MS = 500;

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
  transition: all ${ANIMATION_TIMEOUT_MS}ms ease-in-out;
  left: ${props => `${props.x - 15}px`};
  top: ${props => `${props.y - 60}px`};
  z-index: ${props => props.priority + props.offset};
  pointer-events: ${props => (props.priority ? 'auto' : 'none')};
  ${props =>
    props.hasMoves &&
    css`
      animation: ${bounceInAnimation} 800ms ease-in-out 0s infinite;
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

const WinningMedal = styled.div`
  position: absolute;
  top: 0;
  left: 25%;
  font-size: 1.1rem;
`;

type Props = {
  cell: GameBoardCell;
  movesRemaining: number;
  offset: number;
  player: Player;
  onClick: () => void;
  onArrived: () => void;
  inLead: boolean;
  boardPlayer: GameBoardPlayer;
  moving: boolean;
};

export const BoardPlayer = ({
  cell,
  movesRemaining,
  offset,
  player,
  onClick,
  onArrived,
  inLead,
  boardPlayer,
  moving,
}: Props) => {
  useEffect(() => {
    if (!moving) {
      setTimeout(onArrived, ANIMATION_TIMEOUT_MS + 400);
    }
  }, [cell, moving]);

  const appliedOffset = offsets[offset] || [0, 0];

  return (
    <PlayerVictory show={boardPlayer.isWinner}>
      <CellPlayer
        onClick={onClick}
        hasMoves={moving}
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
          {inLead && <WinningMedal>🥇</WinningMedal>}
        </div>
      </CellPlayer>
    </PlayerVictory>
  );
};
