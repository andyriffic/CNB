import React from 'react';
import styled, { css } from 'styled-components';
import {
  fadeInAnimation,
  fadeInLeftAnimation,
  slideInUpAnimation,
  spinAwayAnimationUp,
} from '../../../../uplift/components/animations';
import { getOrdinal } from '../../../../uplift/utils/ordinal';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasCard, GasPlayer } from '../../../providers/GasProvider';
import { Card } from './Card';
import { PlayerBonusPoints } from './PlayerBonusPoints';

const PlayerListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  height: 200px;
`;

const CardContainer = styled.div`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
`;

const PlayerAvatarContainer = styled.div<{ alive: boolean }>`
  opacity: ${({ alive }) => (alive ? 1 : 0.4)};
  ${({ alive }) =>
    !alive &&
    css`
      animation: ${spinAwayAnimationUp} 1000ms ease-in-out 0s 1 backwards;
    `}
`;

const PlayerListItem = styled.div<{ active: boolean }>`
  position: relative;
  transition: top 300ms ease-in-out, opacity 1s linear;
  top: ${({ active }) => (active ? '-20%' : '0')};
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

const DeathIcon = styled.div``;

const getDeathIcons = (total: number) => {
  const icons = [];
  for (var x = 0; x < Math.min(total, 2); x++) {
    icons.push('☠️');
  }

  if (total > 2) {
    icons.push(`x${total}`);
  }

  return icons;
};

const markedForDeath = (player: GasPlayer): JSX.Element | null => {
  if (!player.guesses.nominatedCount) {
    return null;
  }

  return (
    <DeathIcon>
      {getDeathIcons(player.guesses.nominatedCount).map((d, i) => (
        <span key={i}>{d}</span>
      ))}
    </DeathIcon>
  );
};

type Props = {
  players: GasPlayer[];
  currentPlayerId: string;
  currentCard?: GasCard;
  gameOver: boolean;
  winningPlayerId: string | undefined;
  showPoints: boolean;
};

export function PlayerList({
  players,
  currentPlayerId,
  currentCard,
  gameOver,
  winningPlayerId,
  showPoints,
}: Props): JSX.Element {
  return (
    <PlayerListContainer>
      {players.map(p => {
        const active = p.player.id === currentPlayerId;
        const winner = p.player.id === winningPlayerId;
        const notDead = p.status !== 'dead';
        return (
          <PlayerListItem
            key={p.player.id}
            active={notDead && (active || winner)}
          >
            <div style={{ position: 'absolute', top: 0 }}>
              <PlayerBonusPoints points={p.guesses.correctGuessCount} />
            </div>
            {active && currentCard && !gameOver && p.status === 'alive' && (
              <CardContainer>
                <Card card={currentCard} />
              </CardContainer>
            )}
            {markedForDeath(p)}
            {p.finishedPosition && (
              <PlayerFinishedPosition>
                {getOrdinal(p.finishedPosition)}
              </PlayerFinishedPosition>
            )}
            {(winner || (active && notDead && !gameOver)) && (
              <PlayerName>{p.player.name}</PlayerName>
            )}
            <PlayerAvatarContainer alive={p.status !== 'dead'}>
              <PlayerAvatar player={p.player} size="small" showZodiac={false} />
            </PlayerAvatarContainer>
            {(!notDead || winner) && <PlayerPoints>{p.points}</PlayerPoints>}
            {/* {p.status === 'dead' && <PlayerIcon>☠️</PlayerIcon>} */}
            {/* {p.status === 'winner' && <PlayerIcon>🎉</PlayerIcon>} */}
          </PlayerListItem>
        );
      })}
    </PlayerListContainer>
  );
}
