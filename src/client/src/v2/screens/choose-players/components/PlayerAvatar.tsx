import React from 'react';
import styled, { css } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import {
  shakeAnimationLeft,
  superSaiyanAnimation,
} from '../../../../uplift/components/animations';
import { Player } from '../../../../uplift/contexts/PlayersProvider';

/*
  opacity: ${props => (props.waiting ? 0.7 : 1)};
  ${props =>
    props.waiting
      ? css`
          animation: ${shakeAnimationLeft} 4s ease-in-out infinite;
        `
      : css`
          animation: ${jackInTheBoxAnimation} 1s ease-in-out;
        `}

*/

const PlayerImage = styled.img<{ playerJoined: boolean }>`
  width: 30vw;
  height: 40vw;
  display: block;
  transition: opacity 1000ms ease-ease-in-out;
  opacity: ${({ playerJoined }) => (playerJoined ? '1' : '0.7')};

  ${({ playerJoined }) =>
    playerJoined
      ? css`
          animation: ${superSaiyanAnimation} 500ms infinite;
        `
      : css`
          animation: ${shakeAnimationLeft} 4000ms infinite;
        `}
`;

type Props = {
  player: Player;
  confirmed: boolean;
};

export const PlayerAvatar = ({ player, confirmed }: Props) => {
  return (
    <PlayerImage
      playerJoined={confirmed}
      src={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
    />
  );
};
