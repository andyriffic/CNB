import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  fadeInAnimation,
  outOfWormholeAnimationFacingLeft,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobPlayer } from '../../../providers/MobProvider';
import removedCross from './assets/removed-cross.png';
import winCheck from './assets/win-check.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-left: 60px;
`;

const Avatar = styled.div<{ fade: boolean }>`
  margin-bottom: 10px;
  opacity: ${({ fade }) => (fade ? 0.5 : 1)};
  transform: scaleX(-1);
`;

const PlayerName = styled.div<{ fade: boolean }>`
  opacity: ${({ fade }) => (fade ? 0.5 : 1)};

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

const MoveContainer = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 40%;
  left: 20px;
  animation: ${outOfWormholeAnimationFacingLeft} 500ms ease-in 0s both;
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
  moved: boolean;
  reveal: boolean;
  eliminated: boolean;
  wonRound: boolean;
  wonGame: boolean;
};

export const MobPlayerAvatar = ({
  mobPlayer,
  moved,
  reveal,
  eliminated,
  wonRound,
  wonGame,
}: Props) => {
  const theme = useThemeComponents();

  return (
    <Container key={mobPlayer.player.id}>
      {wonGame && <div style={{ position: 'absolute' }}>🎉</div>}
      <Avatar fade={!moved}>
        <PlayerAvatar player={mobPlayer.player} size="smallMedium" />
      </Avatar>
      <PlayerName fade={reveal && eliminated}>
        {mobPlayer.player.name}
      </PlayerName>
      {mobPlayer.lastMoveId && reveal && theme && (
        <MoveContainer>{theme.moves[mobPlayer.lastMoveId]}</MoveContainer>
      )}
      {reveal && eliminated && <RemovedPlayer src={removedCross} />}
      {/* {reveal && wonRound && <WinPlayer src={winCheck} />} */}
    </Container>
  );
};
