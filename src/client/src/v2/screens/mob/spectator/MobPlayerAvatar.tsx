import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  enterTopAnimation,
  fadeInAnimation,
  fadeInDownAnimation,
  outOfWormholeAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobPlayer } from '../../../providers/MobProvider';
import removedCross from './assets/removed-cross.png';
import winCheck from './assets/win-check.png';

const Container = styled.div<{ highlight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* background-color: ${({ highlight }) => highlight && 'goldenrod'}; */
  padding-left: 60px;
`;

const Avatar = styled.div<{ fade: boolean }>`
  margin-bottom: 10px;
  opacity: ${({ fade }) => (fade ? 0.5 : 1)};
  transform: scaleX(-1);
`;

const PlayerName = styled.div<{ fade: boolean }>`
  border: 2px solid black;
  background: #fff;
  color: black;
  padding: 4px 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  border-radius: 8px;
  text-transform: uppercase;
  opacity: ${({ fade }) => (fade ? 0.5 : 1)};
`;

const MoveContainer = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 40%;
  left: 20px;
  animation: ${outOfWormholeAnimation} 500ms ease-in 0s both;
  transform: scaleX(-1);
`;

const RemovedPlayer = styled.img`
  position: absolute;
  top: 20%;
  left: 25%;
  width: 80px;
  height: 80px;
  animation: ${fadeInAnimation} 500ms ease-in 1s both;
`;

const WinPlayer = styled.img`
  position: absolute;
  top: 20%;
  left: 25%;
  width: 80px;
  height: 80px;
  animation: ${fadeInAnimation} 500ms ease-in 1s both;
`;

type Props = {
  mobPlayer: MobPlayer;
  revealMove: boolean;
  winner: boolean;
  highlight: boolean;
};

export const MobPlayerAvatar = ({
  mobPlayer,
  revealMove,
  winner,
  highlight,
}: Props) => {
  const theme = useThemeComponents();

  const moved = !!mobPlayer.lastMoveId;

  return (
    <Container key={mobPlayer.player.id} highlight={highlight}>
      {winner && <div>🎉</div>}
      <Avatar fade={!(revealMove && moved && mobPlayer.active)}>
        <PlayerAvatar player={mobPlayer.player} size="smallMedium" />
      </Avatar>
      <PlayerName fade={revealMove && !mobPlayer.active}>
        {mobPlayer.player.name}
      </PlayerName>
      {mobPlayer.lastMoveId && revealMove && theme && (
        <MoveContainer>{theme.moves[mobPlayer.lastMoveId]}</MoveContainer>
      )}
      {!mobPlayer.active && revealMove && <RemovedPlayer src={removedCross} />}
      {mobPlayer.active && revealMove && <WinPlayer src={winCheck} />}
    </Container>
  );
};
