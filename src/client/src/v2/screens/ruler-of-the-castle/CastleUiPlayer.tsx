import React, { useEffect, useState } from 'react';
import styled, {
  css,
  FlattenSimpleInterpolation,
  keyframes,
} from 'styled-components';
import { PlayerAvatar } from '../../components/player-avatar';
import { CastlePlayer, CastlePlayerPosition } from './useCastleState';

type PlayerMovements = 'arriving' | 'entering-castle' | 'leaving-castle';

const PLAYER_POSITIONS_PERCENT: {
  [key in CastlePlayerPosition]: [number, number];
} = {
  'approaching-castle': [10, 45],
  'in-castle': [55, 30],
  'leaving-castle': [150, 30],
};

const approachingAnimation = keyframes`
    from { top: 100%; }
    to { top: ${PLAYER_POSITIONS_PERCENT['approaching-castle'][1]}%; }
`;

const shrinkAnimation = keyframes`
    from { 
      top: ${PLAYER_POSITIONS_PERCENT['approaching-castle'][1]}%;
      left: ${PLAYER_POSITIONS_PERCENT['approaching-castle'][0]}%;
      transform: scale(1);
     }
    to { 
      top: ${PLAYER_POSITIONS_PERCENT['in-castle'][1]}%;
      left: ${PLAYER_POSITIONS_PERCENT['in-castle'][0]}%;
      transform: scale(0.6);
    }
`;

const PLAYER_MOVEMENT_ANIMATIONS: {
  [key in PlayerMovements]?: FlattenSimpleInterpolation;
} = {
  arriving: css`
    animation: ${approachingAnimation} 2000ms linear 1 both;
  `,
  'entering-castle': css`
    animation: ${shrinkAnimation} 1000ms linear 1 both;
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
};

const getPlayerMovement = (
  castlePlayer: CastlePlayer,
  enteringCastle: boolean
): PlayerMovements | undefined => {
  if (enteringCastle) {
    return 'entering-castle';
  }
  if (castlePlayer.position === 'approaching-castle') {
    return 'arriving';
  }
};

export const CastleUiPlayer = ({ castlePlayer }: Props) => {
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
      movement={getPlayerMovement(castlePlayer, enterCastle)}
    >
      <PlayerAvatar
        player={castlePlayer.player}
        size={
          castlePlayer.position === 'approaching-castle'
            ? 'medium'
            : 'smallMedium'
        }
        showZodiac={false}
        showBadges={false}
      />
    </PositionedPlayer>
  );
};
