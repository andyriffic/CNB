import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  getPlayerStringAttributeValue,
  isPlayersBirthday,
} from '../../uplift/utils/player';
import { Player } from '../providers/PlayersProvider';
import { PlayerAvatar } from './player-avatar';
import { AvatarSizeStyles } from './player-avatar/AvatarImage';
import birthdayBackground from './happy-birthday-background.gif';
import birthdayText from './happy-birthday-text.gif';

const Container = styled.div`
  position: relative;
`;

const HappyBirthdayBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const HappyBirthdayText = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

type Props = {
  player: Player;
  size: keyof AvatarSizeStyles;
};

export const PlayerAvatarWithBirthday = ({ player, size }: Props) => {
  const hasBirthdayToday = useMemo(() => {
    return isPlayersBirthday(player);
  }, [player]);

  return (
    <Container>
      <PlayerAvatar player={player} size={size} showZodiac={false} />
      {hasBirthdayToday && (
        <>
          <HappyBirthdayBackground src={birthdayBackground} alt="" />
          <HappyBirthdayText src={birthdayText} alt="" />
        </>
      )}
    </Container>
  );
};
