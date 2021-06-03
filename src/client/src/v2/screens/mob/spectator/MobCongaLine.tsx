import React, { useEffect, useReducer, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  fadeInAnimation,
  outOfWormholeAnimationFacingLeft,
  spinAwayAnimationUp,
  backOutRightAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobPlayer, MoveResult } from '../../../providers/MobProvider';

const CongaPlayer = styled.div<{
  highlight: boolean;
  position: number;
  animation: 'lose' | 'win';
}>`
  margin-top: 40px;
  position: absolute;
  left: ${({ position }) => `${Math.max(position, 0) * 200}px`};
  ${({ highlight, animation }) =>
    highlight &&
    css`
      animation: ${animation === 'lose'
          ? spinAwayAnimationUp
          : backOutRightAnimation}
        1000ms ease-in-out 1500ms both;
    `}
  transition: all 500ms ease-in;
`;

const MoveContainer = styled.div`
  z-index: 1;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 40%;
  left: -15%;
  animation: ${outOfWormholeAnimationFacingLeft} 300ms ease-in 500ms both;
  transform: scaleX(-1);
`;

const moveResultBackground: { [key in MoveResult]: string } = {
  won: 'green',
  draw: 'orange',
  lost: 'red',
};

const MoveResultIndicator = styled.div<{ backgroundColor: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ backgroundColor }) => backgroundColor};
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  animation: ${fadeInAnimation} 300ms ease-in 1000ms both;
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
      {activePlayers.map((p, i) => {
        const highlight = highlightPlayerIndex >= i;
        return (
          <CongaPlayer
            key={p.player.id}
            highlight={highlight}
            position={i - highlightPlayerIndex}
            animation={p.lastMoveResult === 'won' ? 'win' : 'lose'}
          >
            <PlayerAvatar player={p.player} size="medium" />
            {p.lastMoveId && highlight && theme && (
              <MoveContainer>{theme.moves[p.lastMoveId]}</MoveContainer>
            )}
            {highlight && p.lastMoveResult && (
              <MoveResultIndicator
                backgroundColor={moveResultBackground[p.lastMoveResult]}
              >
                {p.lastMoveResult}
              </MoveResultIndicator>
            )}
          </CongaPlayer>
        );
      })}
    </div>
  );
}
