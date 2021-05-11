import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { MobPlayer } from '../../../providers/MobProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  margin-bottom: 10px;
`;

const PlayerName = styled.div`
  border: 2px solid black;
  background: #fff;
  color: black;
  padding: 4px 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  border-radius: 8px;
  text-transform: uppercase;
`;

type Props = {
  mobPlayer: MobPlayer;
};

export const MobPlayerAvatar = ({ mobPlayer }: Props) => {
  return (
    <Container>
      <Avatar>
        <PlayerAvatar player={mobPlayer.player} size="smallMedium" />
      </Avatar>
      <PlayerName>{mobPlayer.player.name}</PlayerName>
    </Container>
  );
};
