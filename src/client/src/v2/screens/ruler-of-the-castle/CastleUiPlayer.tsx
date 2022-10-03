import React, { useEffect, useState } from 'react';
import styled, {
  css,
  FlattenSimpleInterpolation,
  keyframes,
} from 'styled-components';
import { PlayerAvatar } from '../../components/player-avatar';
import {
  CastlePlayer,
  CastlePlayerPosition,
  PlayerMovements,
  UseCastleStateResult,
} from './useCastleState';

const PLAYER_POSITIONS_PERCENT: {
  [key in CastlePlayerPosition]: [number, number];
} = {
  'outside-castle': [10, 45],
  'inside-castle': [55, 30],
  'leaving-castle': [150, 30],
};

const approachingAnimation = keyframes`
    from { top: 100%; }
    to { top: ${PLAYER_POSITIONS_PERCENT['outside-castle'][1]}%; }
`;

const shrinkAnimation = keyframes`
    from { 
      top: ${PLAYER_POSITIONS_PERCENT['outside-castle'][1]}%;
      left: ${PLAYER_POSITIONS_PERCENT['outside-castle'][0]}%;
      transform: scale(1);
     }
    to { 
      top: ${PLAYER_POSITIONS_PERCENT['inside-castle'][1]}%;
      left: ${PLAYER_POSITIONS_PERCENT['inside-castle'][0]}%;
      transform: scale(0.6);
    }
`;

export const spinAwayAnimationRight = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(600%, 0) rotate(1080deg); }
`;

const PLAYER_MOVEMENT_ANIMATIONS: {
  [key in PlayerMovements]?: FlattenSimpleInterpolation;
} = {
  arrive: css`
    animation: ${approachingAnimation} 2000ms linear 1 both;
  `,
  'enter-castle': css`
    animation: ${shrinkAnimation} 1000ms linear 1 both;
  `,
  'leave-castle': css`
    animation: ${spinAwayAnimationRight} 1000ms linear 1 both;
  `,
};

const PositionedPlayer = styled.div<{
  position: [number, number];
  movement?: PlayerMovements;
}>`
  position: absolute;
  transition: top 500ms linear, left 500ms linear;
  top: ${({ position }) => `${position[1]}%`};
  left: ${({ position }) => `${position[0]}%`};
  ${({ movement }) => movement && PLAYER_MOVEMENT_ANIMATIONS[movement]}
  transform-origin: 0 0;
`;

type Props = {
  castlePlayer: CastlePlayer;
  castleState: UseCastleStateResult;
  movement?: PlayerMovements;
};

const getPlayerMovement = (
  castlePlayer: CastlePlayer,
  enteringCastle: boolean
): PlayerMovements | undefined => {
  if (enteringCastle) {
    return 'enter-castle';
  }
  if (castlePlayer.position === 'outside-castle') {
    return 'arrive';
  }
};

export const CastleUiPlayer = ({ castlePlayer, movement }: Props) => {
  const [enterCastle, setEnterCastle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEnterCastle(true);
    }, 3000);
  }, []);

  if (!castlePlayer.player) {
    return null;
  }

  return (
    <PositionedPlayer
      position={PLAYER_POSITIONS_PERCENT[castlePlayer.position]}
      movement={movement}
    >
      <PlayerAvatar
        player={castlePlayer.player}
        size={
          castlePlayer.position === 'outside-castle' ? 'medium' : 'smallMedium'
        }
        showZodiac={false}
        showBadges={false}
      />
    </PositionedPlayer>
  );
};
