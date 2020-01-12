import React from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../contexts/PlayersProvider';
import { SOCKETS_ENDPOINT } from '../../environment';

export type PlayerAvatarPosition = 'left' | 'right';

const StyledPlayer = styled.img<{
  position: PlayerAvatarPosition;
  overrideStyle: string;
}>`
  width: 20vmin;
  height: 30vmin;
  ${props => props.position === 'right' && 'transform: scaleX(-1);'}
  ${props => props.overrideStyle};
`;

type PlayerAvatarProps = {
  player: Player;
  position?: PlayerAvatarPosition;
  overrideStyle?: string;
};

export const PlayerAvatar = ({
  player,
  position = 'left',
  overrideStyle = '',
}: PlayerAvatarProps) => {
  return (
    <StyledPlayer
      position={position}
      src={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
      overrideStyle={overrideStyle}
    ></StyledPlayer>
  );
};
