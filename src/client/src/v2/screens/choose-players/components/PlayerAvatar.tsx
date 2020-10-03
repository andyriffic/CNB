import React from 'react';
import styled, { css } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { superSaiyanAnimation } from '../../../../uplift/components/animations';
import { Player } from '../../../../uplift/contexts/PlayersProvider';

const PlayerImage = styled.img<{ superSaiyan: boolean }>`
  width: 30vw;
  height: 40vw;
  display: block;
  ${({ superSaiyan }) =>
    superSaiyan &&
    css`
      animation: ${superSaiyanAnimation} 500ms infinite;
    `}
`;

type Props = {
  player: Player;
  confirmed: boolean;
};

export const PlayerAvatar = ({ player, confirmed }: Props) => {
  return (
    <PlayerImage
      superSaiyan={confirmed}
      src={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
    />
  );
};
