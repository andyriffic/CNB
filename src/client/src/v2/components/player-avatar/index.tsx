import React from 'react';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../../../environment';
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

const badgeScale: { [key in keyof AvatarSizeStyles]: number } = {
  small: 0.5,
  smallMedium: 0.6,
  medium: 0.8,
  large: 1,
};

type Props = {
  player: Player;
  size: keyof AvatarSizeStyles;
};

export const PlayerAvatar = ({ player, size }: Props) => {
  return (
    <Container>
      <AvatarImage
        size={size}
        imageUrl={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
      />
      <PositionedBadges style={{ transform: `scale(${badgeScale[size]})` }}>
        <PlayerBadges tags={player.tags} />
      </PositionedBadges>
      <PositionedZodiacSign style={{ transform: `scale(${badgeScale[size]})` }}>
        <ZodiacSign tags={player.tags} />
      </PositionedZodiacSign>
    </Container>
  );
};
