import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  fadeInAnimation,
  outOfWormholeAnimationFacingLeft,
  backOutRightAnimation,
  hingeOutAnimation,
} from '../../../../uplift/components/animations';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobPlayer, MoveResult } from '../../../providers/MobProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';

const WinningPlayer = styled.div``;

const ReversedPlayerAvatar = styled.div`
  transform: scaleX(-1);
`;
type Props = {
  winningPlayers: MobPlayer[];
};

function reducer(state: number, action: 'increment'): number {
  switch (action) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

export function MobWinners({ winningPlayers }: Props): JSX.Element {
  const { play } = useSoundProvider();

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        marginTop: '40px',
      }}
    >
      {winningPlayers.map(p => {
        return (
          <WinningPlayer key={p.player.id}>
            <ReversedPlayerAvatar>
              <PlayerAvatar player={p.player} size="smallMedium" />
            </ReversedPlayerAvatar>
          </WinningPlayer>
        );
      })}
    </div>
  );
}
