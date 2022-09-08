import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { isFeatureEnabled } from '../../../../featureToggle';
import {
  fadeInAnimation,
  spinAwayAnimationUp,
} from '../../../../uplift/components/animations';
import { getOrdinal } from '../../../../uplift/utils/ordinal';
import { PlayerAvatar } from '../../../components/player-avatar';
import { AvatarSizeStyles } from '../../../components/player-avatar/AvatarImage';
import { GasGame, GasPlayer } from '../../../providers/GasProvider';
import { Card } from './Card';
import { PlayerBonusPoints } from './PlayerBonusPoints';

const usePlayerCarousel = isFeatureEnabled('carousel');

const CardContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PlayerAvatarContainer = styled.div<{ alive: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  ${({ alive }) =>
    !alive &&
    css`
      animation: ${spinAwayAnimationUp} 1000ms ease-in-out 0s 1 backwards;
    `}
`;

const PlayerListItem = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PlayerFinishedPosition = styled.div`
  font-size: 0.9rem;
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

const PlayerPoints = styled.div`
  font-size: 1rem;
  position: absolute;
  bottom: -30%;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  border: 2px solid #444;
  background-color: crimson;
  color: white;
  padding: 3px;
  border-radius: 4px;
  animation: ${fadeInAnimation} 1000ms ease-in-out 2000ms both;
`;

const PlayerName = styled.div`
  position: absolute;
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid white;
  color: ${({ theme }) => theme.color.text02};
  background-color: ${({ theme }) => theme.color.background02};
  padding: 5px;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.smallish};
  white-space: nowrap;
`;

const DeathContainer = styled.div<{ active: boolean }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.1s;
  opacity: ${({ active }) => (active ? '1' : '0.5')};
  /* border: 2px solid darkred;
  border-radius: 25%;
  background: black;
  padding: 4px; */
`;

const DeathIcon = styled.div`
  font-size: 1.3rem;
`;

const TimedOutIcon = styled.div`
  position: absolute;
`;

const PlayerStatsContainer = styled.div`
  position: absolute;
  bottom: -200px;
`;

const getDeathIcons = (total: number) => {
  if (!total) {
    return [];
  }

  if (usePlayerCarousel) {
    return new Array(total).fill('☠️');
  }

  const icons = ['☠️'];

  if (total > 1) {
    icons.push(`x${total}`);
  }

  return icons;
};

const markedForDeath = (
  player: GasPlayer,
  active: boolean
): JSX.Element | null => {
  if (!player.guesses.nominatedCount) {
    return null;
  }

  return (
    <DeathContainer active={active}>
      <DeathIcon>
        {getDeathIcons(player.guesses.nominatedCount).map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </DeathIcon>
    </DeathContainer>
  );
};

type Props = {
  player: GasPlayer;
  game: GasGame;
  gameOver: boolean;
  size?: keyof AvatarSizeStyles;
};

export function PlayerCarouselPlayer({
  player,
  game,
  gameOver,
  size = 'medium',
}: Props): JSX.Element | null {
  const alive = useMemo(() => {
    return player.status !== 'dead';
  }, [player]);

  const [show, setShow] = useState(alive);

  useEffect(() => {
    if (alive) {
      return;
    }
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }, [alive]);

  const active = player.player.id === game.currentPlayer.id;
  const winner = player.player.id === game.winningPlayerId;

  const notDead = player.status !== 'dead';

  return show ? (
    <PlayerListItem
      key={player.player.id}
      active={notDead && (active || winner)}
    >
      {/* {(winner || (active && notDead && !gameOver)) && (
        <PlayerName>{player.player.name}</PlayerName>
      )} */}
      <PlayerAvatarContainer alive={alive}>
        <PlayerAvatar
          player={player.player}
          size={size}
          showZodiac={false}
          showBadges={false}
        />
      </PlayerAvatarContainer>
      {active &&
        game.currentPlayer.cardPlayed &&
        !gameOver &&
        player.status === 'alive' && (
          <CardContainer>
            <Card
              card={game.currentPlayer.cardPlayed}
              pressesRemaining={game.currentPlayer.pressesRemaining}
            />
          </CardContainer>
        )}
      {markedForDeath(player, active)}
    </PlayerListItem>
  ) : null;
}
