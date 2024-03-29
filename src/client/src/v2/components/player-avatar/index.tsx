import React from 'react';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../../../environment';
import { getPlayerAttributeValue } from '../../../uplift/utils/player';
import { Player } from '../../providers/PlayersProvider';
import { AvatarImage, AvatarSizeStyles } from './AvatarImage';
import { PlayerBadges } from './PlayerBadges';
import { ZodiacSign } from './ZodiacSign';

const Container = styled.div`
  position: relative;
`;

const PositionedBadges = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
`;

const PositionedZodiacSign = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
`;

const CastleDefenderBadge = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const badgeScale: { [key in keyof AvatarSizeStyles]: number } = {
  small: 0.5,
  smallishMedium: 0.5,
  smallMedium: 0.6,
  medium: 0.8,
  large: 1,
};

type Props = {
  player: Player;
  size: keyof AvatarSizeStyles;
  showZodiac?: boolean;
  showBadges?: boolean;
};

export const PlayerAvatar = ({
  player,
  size,
  showZodiac = true,
  showBadges = true,
}: Props) => {
  const accentColor = getPlayerAttributeValue(player.tags, 'rt_color', '#000');
  const isCastleDefender = player.tags.includes('castle_defender');

  return (
    <Container>
      <AvatarImage
        size={size}
        imageUrl={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
        accentColor={accentColor}
      />
      {showBadges && (
        <PositionedBadges style={{ transform: `scale(${badgeScale[size]})` }}>
          <PlayerBadges tags={player.tags} />
        </PositionedBadges>
      )}
      {showZodiac && (
        <PositionedZodiacSign
          style={{ transform: `scale(${badgeScale[size]})` }}
        >
          <ZodiacSign tags={player.tags} />
        </PositionedZodiacSign>
      )}
      {isCastleDefender && <CastleDefenderBadge>🏰</CastleDefenderBadge>}
    </Container>
  );
};
