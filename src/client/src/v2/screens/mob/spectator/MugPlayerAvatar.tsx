import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  zoomOutUpAnimation,
  outOfWormholeAnimation,
  shakeAndGrowAnimation,
} from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MobRoundState, MugPlayer } from '../../../providers/MobProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import lifeHeart from './assets/life-heart.png';
import { Points } from './Points';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* width: 230px; */
`;

const Avatar = styled.div<{ moved: boolean; won: boolean }>`
  margin-bottom: 10px;
  opacity: ${({ moved }) => (moved ? 1 : 0.5)};
  ${({ won }) =>
    won &&
    css`
      animation: ${shakeAndGrowAnimation} 1500ms infinite;
    `}
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
  position: absolute;
  z-index: 1;
`;

const Life = styled.img<{ used: boolean }>`
  width: 30px;
  ${({ used }) =>
    used &&
    css`
      animation: ${zoomOutUpAnimation} 1500ms both;
    `}
`;

const MoveContainer = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 40%;
  right: -10%;
  animation: ${outOfWormholeAnimation} 500ms ease-in 0s forwards;
`;

const Emoji = styled.div<{ animate: boolean }>`
  font-size: 5rem;
  position: absolute;
  bottom: 0;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${shakeAndGrowAnimation} 1800ms infinite;
    `}
`;

const PointsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  mugPlayer: MugPlayer;
  revealMove: boolean;
  winner: boolean;
  loser: boolean;
  roundState: MobRoundState;
  totalMobPlayers: number;
  totalActiveMobPlayers: number;
  points: number;
};

export const MugPlayerAvatar = ({
  mugPlayer,
  revealMove,
  winner,
  loser,
  roundState,
  totalMobPlayers,
  totalActiveMobPlayers,
  points,
}: Props) => {
  const theme = useThemeComponents();
  const { play } = useSoundProvider();

  const [displayedLives, setDisplayedLives] = useState(mugPlayer.lives);
  const [displayedPlayersRemaining, setDisplayedPlayersRemaining] = useState(
    totalActiveMobPlayers
  );

  useEffect(() => {
    if (roundState === 'viewed') {
      if (mugPlayer.lives < displayedLives) {
        play('MobLoseLife');
      }
      setDisplayedLives(mugPlayer.lives);
    }
  }, [roundState, mugPlayer]);

  useEffect(() => {
    if (roundState === 'viewed') {
      setDisplayedPlayersRemaining(totalActiveMobPlayers);
    }
  }, [roundState, totalActiveMobPlayers]);

  return (
    <Container>
      <Lives>
        {[...Array(3)].map((l, i) => (
          <Life key={i} src={lifeHeart} used={i + 1 > displayedLives} />
        ))}
      </Lives>
      <Avatar moved={!!mugPlayer.lastMoveId} won={winner}>
        <PlayerAvatar player={mugPlayer.player} size="medium" />
      </Avatar>
      <PlayerName>{mugPlayer.player.name}</PlayerName>
      {mugPlayer.lastMoveId && revealMove && theme && !winner && !loser && (
        <MoveContainer>{theme.moves[mugPlayer.lastMoveId]}</MoveContainer>
      )}
      {/* <div>
        Mob remaining: {Number(displayedPlayersRemaining)}/{totalMobPlayers}
      </div> */}
      {winner && <Emoji animate={false}>🎉</Emoji>}
      {loser && <Emoji animate={true}>😭</Emoji>}
      {/* {winner && (
        <Points>
          Knocked out <strong>{totalMobPlayers}</strong> players
        </Points>
      )} */}
      {winner || loser ? (
        <PointsContainer>
          <Points points={points} />
        </PointsContainer>
      ) : null}
    </Container>
  );
};
