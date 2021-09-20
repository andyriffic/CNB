import React, { useEffect, useReducer, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  bounceAnimation,
  jackInTheBoxAnimation,
} from '../../../../uplift/components/animations';
import { MobPlayer } from '../../../providers/MobProvider';
import { PlayerAvatarLookup } from './PlayerAvatarLookup';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  margin-left: 80px;
  position: relative;
`;

const WaitingPlayer = styled.div<{ moved: boolean }>`
  opacity: ${({ moved }) => (moved ? '1' : '0.6')};
  ${({ moved }) =>
    moved
      ? css`
          animation: ${jackInTheBoxAnimation} 800ms ease-in-out;
        `
      : css`
          animation: ${bounceAnimation} 1000ms ease-in-out infinite;
        `}
`;

const ReversedPlayerAvatar = styled.div`
  transform: scaleX(-1);
`;

const PlayerName = styled.div`
  text-align: center;
  position: relative;
  top: -20px;
  /* font-family: ${({ theme }) => theme.fontFamily.feature}; */
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.background03};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #aaa;
`;

type Props = {
  activePlayers: MobPlayer[];
};

export function MobWaitingMoves({ activePlayers }: Props): JSX.Element {
  return (
    <Container>
      {activePlayers.map(p => {
        const moved = !!p.lastMoveId;
        return (
          <WaitingPlayer key={p.playerId} moved={moved}>
            <ReversedPlayerAvatar>
              <PlayerAvatarLookup playerId={p.playerId} size="smallMedium" />
            </ReversedPlayerAvatar>
            {/* <PlayerName>{p.player.name}</PlayerName> */}
          </WaitingPlayer>
        );
      })}
    </Container>
  );
}
