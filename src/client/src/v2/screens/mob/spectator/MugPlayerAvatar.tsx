import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MugPlayer } from '../../../providers/MobProvider';
import lifeHeart from './assets/life-heart.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div<{ moved: boolean }>`
  margin-bottom: 10px;
  opacity: ${({ moved }) => (moved ? 1 : 0.5)};
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

const MoveContainer = styled.div`
  width: 60px;
  height: 60px;
`;

type Props = {
  mugPlayer: MugPlayer;
  revealMove: boolean;
  winner: boolean;
  loser: boolean;
};

export const MugPlayerAvatar = ({
  mugPlayer,
  revealMove,
  winner,
  loser,
}: Props) => {
  const theme = useThemeComponents();

  return (
    <Container>
      {winner && <div>🎉</div>}
      {loser && <div>😭</div>}
      <Lives>
        {[...Array(mugPlayer.lives)].map((l, i) => (
          <Life key={i} src={lifeHeart} />
        ))}
      </Lives>
      <Avatar moved={!!mugPlayer.lastMoveId}>
        <PlayerAvatar player={mugPlayer.player} size="smallMedium" />
      </Avatar>
      <PlayerName>{mugPlayer.player.name}</PlayerName>
      {mugPlayer.lastMoveId && revealMove && theme && (
        <MoveContainer>{theme.moves[mugPlayer.lastMoveId]}</MoveContainer>
      )}
    </Container>
  );
};
