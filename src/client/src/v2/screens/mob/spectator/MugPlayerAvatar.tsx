import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { MugPlayer } from '../../../providers/MobProvider';
import lifeHeart from './assets/life-heart.png';

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

const Lives = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Life = styled.img`
  width: 30px;
`;

type Props = {
  mugPlayer: MugPlayer;
};

export const MugPlayerAvatar = ({ mugPlayer }: Props) => {
  return (
    <Container>
      <Lives>
        {[...Array(mugPlayer.lives)].map(l => (
          <Life src={lifeHeart} />
        ))}
      </Lives>
      <Avatar>
        <PlayerAvatar player={mugPlayer.player} size="smallMedium" />
      </Avatar>
      <PlayerName>{mugPlayer.player.name}</PlayerName>
    </Container>
  );
};
