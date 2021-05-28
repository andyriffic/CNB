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

const FacingDirection = styled.div<{ faceLeft: boolean }>`
  ${({ faceLeft }) => faceLeft && 'transform: scaleX(-1);'}
`;

const PlayerName = styled.div`
  text-align: center;
  position: relative;
  top: -80px;
  font-family: ${({ theme }) => theme.fontFamily.feature};
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.color.background03};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme }) => theme.color.text02};
`;

type Props = {
  player: Player;
  confirmed: boolean;
  pos?: 'left' | 'right';
};

export const ChoosePlayerAvatar = ({
  player,
  confirmed,
  pos = 'left',
}: Props) => {
  return (
    <Container playerJoined={confirmed}>
      <FacingDirection faceLeft={pos === 'right'}>
        <PlayerAvatar player={player} size="large" />
      </FacingDirection>

      <PlayerName>{player.name}</PlayerName>
    </Container>
  );
};
