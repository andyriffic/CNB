import React from 'react';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../../../environment';
import { Player } from '../../providers/PlayersProvider';
import { AvatarImage, AvatarSizeStyles } from './AvatarImage';
import { PlayerBadges } from './PlayerBadges';

const Container = styled.div`
  display: relative;
`;

const PositionedBadges = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

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
      <PositionedBadges>
        <PlayerBadges tags={player.tags} />
      </PositionedBadges>
    </Container>
  );
};
