import React from 'react';
import styled from 'styled-components';
import {
  enterTopAnimation,
  outOfWormholeAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MugPlayer } from '../../../providers/MobProvider';
import lifeHeart from './assets/life-heart.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* width: 230px; */
`;

const Avatar = styled.div<{ moved: boolean }>`
  margin-bottom: 10px;
  opacity: ${({ moved }) => (moved ? 1 : 0.5)};
`;

const PlayerName = styled.div`
  text-align: center;
  position: relative;
  top: -20px;
  /* font-family: ${({ theme }) => theme.fontFamily.feature}; */
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.background03};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #aaa;
`;

const Lives = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Life = styled.img`
  width: 30px;
`;

const MoveContainer = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 40%;
  right: -10%;
  animation: ${outOfWormholeAnimation} 500ms ease-in 0s forwards;
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
        <PlayerAvatar player={mugPlayer.player} size="medium" />
      </Avatar>
      <PlayerName>{mugPlayer.player.name}</PlayerName>
      {mugPlayer.lastMoveId && revealMove && theme && !winner && (
        <MoveContainer>{theme.moves[mugPlayer.lastMoveId]}</MoveContainer>
      )}
    </Container>
  );
};
