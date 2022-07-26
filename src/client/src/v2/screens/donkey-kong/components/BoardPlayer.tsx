import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Rainbow from '../../../../components/rainbow-text';
import { GameBoardCellWithPlayers } from '../types';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import {
  bounceAnimation,
  superSaiyanAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GameBoardPlayer } from '../providers/GameBoardProvider';

export const PLAYER_MOVE_ANIMATION_TIMEOUT_MS = 200;

const borderPulseAnimation = keyframes`
0% {
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      box-shadow: 0 0 0 20px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
  `;

const CellPlayer = styled.div<{
  priority: number;
  offset: number;
  hasMoves: boolean;
  inLead: boolean;
}>`
  box-sizing: border-box;
  position: absolute;
  transition: all ${PLAYER_MOVE_ANIMATION_TIMEOUT_MS}ms ease-in-out;
  z-index: ${props => props.priority + props.offset};
  pointer-events: ${props => (props.priority ? 'auto' : 'none')};
  ${props =>
    props.hasMoves &&
    css`
      animation: ${bounceAnimation} 800ms ease-in-out 0s infinite;
    `}

  ${props =>
    props.inLead &&
    css`
      animation: ${superSaiyanAnimation} 2s ease-in-out infinite;
    `}

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const FlipDirection = styled.div<{ reverse: boolean }>`
  ${({ reverse }) =>
    reverse &&
    css`
      transform: scaleX(-1);
    `}
`;

const MovesRemaining = styled.div`
  position: absolute;
  bottom: 0;
  left: 15px;
  background: black;
  border-radius: 50%;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Shield = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid goldenrod;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: -15px;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: ${borderPulseAnimation} 1.5s infinite;
`;

type Props = {
  gameBoardPlayer: GameBoardPlayer;
  cell: GameBoardCellWithPlayers;
};

export const BoardPlayer = ({ gameBoardPlayer, cell }: Props) => {
  return (
    <>
      <CellPlayer
        hasMoves={false}
        priority={gameBoardPlayer.movesRemaining}
        offset={gameBoardPlayer.positionOffset}
        inLead={gameBoardPlayer.inLead}
      >
        <div style={{ position: 'relative' }}>
          <FlipDirection reverse={cell.facingDirection === 'left'}>
            <PlayerAvatar player={gameBoardPlayer.player} size="small" />
          </FlipDirection>
          {!!gameBoardPlayer.movesRemaining && (
            <MovesRemaining>
              <ReadableNumberFont>
                <Rainbow>{gameBoardPlayer.movesRemaining}</Rainbow>
              </ReadableNumberFont>
            </MovesRemaining>
          )}
          {gameBoardPlayer.immunity && <Shield />}
        </div>
      </CellPlayer>
    </>
  );
};
