import React, { useEffect, useReducer, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  outOfWormholeAnimationFacingLeft,
  spinAwayAnimationUp,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobPlayer } from '../../../providers/MobProvider';

const CongaPlayer = styled.div<{ highlight: boolean; position: number }>`
  margin-top: 40px;
  position: absolute;
  left: ${({ position }) => `${Math.max(position, 0) * 200}px`};
  ${({ highlight }) =>
    highlight &&
    css`
      animation: ${spinAwayAnimationUp} 1000ms ease-in-out 1500ms both;
    `}
  transition: all 500ms ease-in;
`;

const MoveContainer = styled.div`
  z-index: 1;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 40%;
  left: -15%;
  animation: ${outOfWormholeAnimationFacingLeft} 300ms ease-in 500ms both;
  transform: scaleX(-1);
`;

type Props = {
  activePlayers: MobPlayer[];
};

function reducer(state: number, action: 'increment'): number {
  switch (action) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

export function MobCongaLine({ activePlayers }: Props): JSX.Element {
  const theme = useThemeComponents();
  const [highlightPlayerIndex, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (highlightPlayerIndex > activePlayers.length) {
        clearInterval(interval);
        return;
      }
      dispatch('increment');
    }, 2000);

    return () => clearInterval(interval);
  }, [activePlayers]);

  return (
    <div style={{ display: 'flex', marginLeft: '80px', position: 'relative' }}>
      {activePlayers.map((p, i) => (
        <CongaPlayer
          key={p.player.id}
          highlight={highlightPlayerIndex >= i}
          position={i - highlightPlayerIndex}
        >
          <PlayerAvatar player={p.player} size="medium" />
          {p.lastMoveId && highlightPlayerIndex >= i && theme && (
            <MoveContainer>{theme.moves[p.lastMoveId]}</MoveContainer>
          )}
        </CongaPlayer>
      ))}
    </div>
  );
}
