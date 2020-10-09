import React from 'react';
import styled, { css } from 'styled-components';
import {
  shakeAnimationLeft,
  superSaiyanAnimation,
} from '../../../../uplift/components/animations';
import { Player } from '../../../../uplift/contexts/PlayersProvider';
import { PlayerAvatar } from '../../../components/player-avatar';

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

const Container = styled.div<{ playerJoined: boolean }>`
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

export const ChoosePlayerAvatar = ({ player, confirmed }: Props) => {
  return (
    <Container playerJoined={confirmed}>
      <PlayerAvatar player={player} size="large" />
    </Container>
  );
};
