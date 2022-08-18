import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  fadeInAnimation,
  outOfWormholeAnimationFacingLeft,
  backOutRightAnimation,
  hingeOutAnimation,
} from '../../../../uplift/components/animations';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { usePlayPlayerZodiacSoundByPlayerId } from '../../../providers/hooks/useZodiacSound';
import { MobPlayer, MoveResult } from '../../../providers/MobProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { PlayerAvatarLookup } from './PlayerAvatarLookup';

const CongaPlayer = styled.div<{
  highlight: boolean;
  position: number;
  animation: 'lose' | 'win';
}>`
  /* margin-top: 40px; */
  position: absolute;
  left: ${({ position }) => `${Math.max(position, 0) * 200}px`};
  ${({ highlight, animation }) =>
    highlight &&
    css`
      animation: ${animation === 'lose'
          ? hingeOutAnimation
          : backOutRightAnimation}
        800ms ease-in-out 1500ms both;
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

const ReversedPlayerAvatar = styled.div`
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
  onComplete: () => void;
  onPlayerEliminated: (mobPlayer: MobPlayer) => void;
};

function reducer(state: number, action: 'increment'): number {
  switch (action) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

export function MobCongaLine({
  activePlayers,
  onComplete,
  onPlayerEliminated,
}: Props): JSX.Element {
  const theme = useThemeComponents();
  const playPlayersZodiacSound = usePlayPlayerZodiacSoundByPlayerId(
    selectRandomOneOf(['MobLose_1', 'MobLose_2', 'MobLose_3'])
  );
  const { play } = useSoundProvider();
  const [highlightPlayerIndex, dispatch] = useReducer(reducer, 0);
  const finishedConga = useRef(false);

  useEffect(() => {
    if (highlightPlayerIndex < activePlayers.length) {
      const timeout = setTimeout(() => dispatch('increment'), 2000);
      return () => clearTimeout(timeout);
    } else if (
      highlightPlayerIndex === activePlayers.length &&
      !finishedConga.current
    ) {
      finishedConga.current = true;
      setTimeout(onComplete, 1200);
    }
  }, [activePlayers, highlightPlayerIndex]);

  useEffect(() => {
    const player = activePlayers[highlightPlayerIndex];
    if (!player || !player.lastMoveId) return;

    setTimeout(() => play('SwitchPlayer'), 500);

    setTimeout(() => {
      if (player.active && player.lastMoveResult === 'won') {
        play(selectRandomOneOf(['MobWin_1', 'MobWin_2', 'MobWin_3']));
      } else if (player.active && player.lastMoveResult === 'draw') {
        play(selectRandomOneOf(['MobDraw_1', 'MobDraw_2', 'MobDraw_3']));
      } else {
        onPlayerEliminated(player);
        playPlayersZodiacSound(player.playerId);
      }
    }, 1200);
  }, [activePlayers, highlightPlayerIndex]);

  return (
    <div style={{ display: 'flex', marginLeft: '80px', position: 'relative' }}>
      {activePlayers.map((p, i) => {
        const highlight = highlightPlayerIndex >= i;
        return (
          <CongaPlayer
            key={p.playerId}
            highlight={highlight}
            position={i - highlightPlayerIndex}
            animation={p.active ? 'win' : 'lose'}
          >
            <ReversedPlayerAvatar>
              <PlayerAvatarLookup playerId={p.playerId} size="medium" />
            </ReversedPlayerAvatar>
            {/* <PlayerName>{p.player.name}</PlayerName> */}
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
