import React, { useEffect, useContext, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Rainbow from '../../../../components/rainbow-text';
import { BOARD_CELL_TYPE, GameBoardCellWithPlayers } from '../types';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import {
  bounceAnimation,
  intoWormholeAnimation,
  outOfWormholeAnimation,
  superSaiyanAnimation,
} from '../../../../uplift/components/animations';
import { selectWeightedRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import {
  GameBoardPlayer,
  useGameBoardProvider,
} from '../providers/GameBoardProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';

export const PLAYER_MOVE_ANIMATION_TIMEOUT_MS = 200;

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

type WormholeState = 'in' | 'out';
const WormholeAnimation = styled.div<{ wormhole?: WormholeState }>`
  ${({ wormhole }) =>
    wormhole === 'in' &&
    css`
      animation: ${intoWormholeAnimation} 1000ms ease-in-out both;
    `}
  ${({ wormhole }) =>
    wormhole === 'out' &&
    css`
      animation: ${outOfWormholeAnimation} 1000ms ease-in-out both;
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

type Props = {
  gameBoardPlayer: GameBoardPlayer;
  cell: GameBoardCellWithPlayers;
};

export const BoardPlayer = ({ gameBoardPlayer, cell }: Props) => {
  const [wormhole, setWormhole] = useState<WormholeState | undefined>(
    undefined
  );
  const { landedInCell } = useGameBoardProvider();
  const { play } = useSoundProvider();

  return (
    <>
      <CellPlayer
        hasMoves={false}
        priority={gameBoardPlayer.movesRemaining}
        offset={gameBoardPlayer.positionOffset}
        inLead={gameBoardPlayer.inLead}
      >
        <div style={{ position: 'relative' }}>
          <WormholeAnimation wormhole={wormhole}>
            <PlayerAvatar player={gameBoardPlayer.player} size="small" />
            {!!gameBoardPlayer.movesRemaining && (
              <MovesRemaining>
                <ReadableNumberFont>
                  <Rainbow>{gameBoardPlayer.movesRemaining}</Rainbow>
                </ReadableNumberFont>
              </MovesRemaining>
            )}
          </WormholeAnimation>
        </div>
      </CellPlayer>
    </>
  );
};
