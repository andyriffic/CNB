import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobPlayer } from '../../../providers/MobProvider';
import removedCross from './assets/removed-cross.png';

const Container = styled.div<{ fade: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ fade }) => (fade ? 0.5 : 1)};
  position: relative;
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

const MoveContainer = styled.div`
  width: 60px;
  height: 60px;
`;

const RemovedPlayer = styled.img`
  position: absolute;
  top: 20%;
  left: 25%;
  width: 80px;
  height: 80px;
`;

type Props = {
  mobPlayer: MobPlayer;
  revealMove: boolean;
  winner: boolean;
};

export const MobPlayerAvatar = ({ mobPlayer, revealMove, winner }: Props) => {
  const theme = useThemeComponents();

  const moved = !!mobPlayer.lastMoveId;

  return (
    <Container key={mobPlayer.player.id} fade={!(moved && mobPlayer.active)}>
      {winner && <div>🎉</div>}
      <Avatar>
        <PlayerAvatar player={mobPlayer.player} size="smallMedium" />
      </Avatar>
      <PlayerName>{mobPlayer.player.name}</PlayerName>
      {mobPlayer.lastMoveId && revealMove && theme && (
        <MoveContainer>{theme.moves[mobPlayer.lastMoveId]}</MoveContainer>
      )}
      {!mobPlayer.active && <RemovedPlayer src={removedCross} />}
    </Container>
  );
};
