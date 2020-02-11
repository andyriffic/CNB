import React from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../contexts/PlayersProvider';
import { SOCKETS_ENDPOINT } from '../../environment';
import { getPlayerAttributeValue } from '../utils/player';
import moment from 'moment';

export type PlayerAvatarPosition = 'left' | 'right';

const getDaysRemaining = (tags: string[]): number | undefined => {
  const dateLeaving = getPlayerAttributeValue(tags, 'leaving', '');

  if (dateLeaving === '') {
    return;
  }

  const dateMoment = moment(dateLeaving).utc();
  var diffInDays = dateMoment.diff(moment().utc(), 'days');
  return diffInDays >= 0 ? diffInDays : undefined;
};

const StyledPlayer = styled.img<{
  position: PlayerAvatarPosition;
  overrideStyle: string;
  opacity: number;
}>`
  width: 20vmin;
  height: 30vmin;
  ${props => props.position === 'right' && 'transform: scaleX(-1);'}
  ${props => props.overrideStyle};
  opacity: ${props => props.opacity};
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
  const daysLeft = getDaysRemaining(player.tags);
  const fadeAwayOpacity =
    daysLeft === undefined ? 1 : 0.4 + (daysLeft * 2) / 100;

  return (
    <StyledPlayer
      position={position}
      opacity={fadeAwayOpacity}
      src={`${SOCKETS_ENDPOINT}${player.avatarImageUrl}`}
      overrideStyle={overrideStyle}
    ></StyledPlayer>
  );
};
