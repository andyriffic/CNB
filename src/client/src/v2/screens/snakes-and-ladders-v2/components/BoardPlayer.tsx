import React, { useEffect, useContext, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Rainbow from '../../../../components/rainbow-text';
import { GameBoardCellWithPlayers } from '../types';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import {
  bounceAnimation,
  superSaiyanAnimation,
} from '../../../../uplift/components/animations';
import { selectWeightedRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import {
  GameBoardPlayer,
  useGameBoardProvider,
} from '../providers/GameBoardProvider';
import { play } from '../../../services/sound-service/soundService';

export const ANIMATION_TIMEOUT_MS = 500;

const offsets = [[0, 0], [-25, 0], [25, 0], [-35, 40], [-10, 40], [15, 40]];

const CellPlayer = styled.div<{
  priority: number;
  offset: number;
  hasMoves: boolean;
  inLead: boolean;
}>`
  box-sizing: border-box;
  position: absolute;
  transition: all ${ANIMATION_TIMEOUT_MS}ms ease-in-out;
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

type Props = {
  gameBoardPlayer: GameBoardPlayer;
  cell: GameBoardCellWithPlayers;
};

export const BoardPlayer = ({ gameBoardPlayer, cell }: Props) => {
  const [isMoving, setIsMoving] = useState(false);
  const { movePlayer, landedInCell } = useGameBoardProvider();

  useEffect(() => {
    if (isMoving) {
      if (gameBoardPlayer.movesRemaining === 0) {
        setIsMoving(false);
        setTimeout(() => {
          landedInCell(gameBoardPlayer, cell);
        }, 1000);
        return;
      }

      setTimeout(() => {
        movePlayer(gameBoardPlayer);
        play('SnakesAndLaddersMove');
      }, 500);
    }
  }, [isMoving, gameBoardPlayer]);

  return (
    <>
      <CellPlayer
        onClick={() => {
          setIsMoving(true);
        }}
        hasMoves={false}
        priority={gameBoardPlayer.movesRemaining}
        offset={gameBoardPlayer.positionOffset}
        inLead={gameBoardPlayer.inLead}
      >
        <div style={{ position: 'relative' }}>
          <PlayerAvatar player={gameBoardPlayer.player} size="small" />
          {!!gameBoardPlayer.movesRemaining && (
            <MovesRemaining>
              <ReadableNumberFont>
                <Rainbow>{gameBoardPlayer.movesRemaining}</Rainbow>
              </ReadableNumberFont>
            </MovesRemaining>
          )}
        </div>
      </CellPlayer>
    </>
  );
};
