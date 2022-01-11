import React from 'react';
import styled, { css } from 'styled-components';
import { spinAwayAnimationUp } from '../../../../uplift/components/animations';
import { getOrdinal } from '../../../../uplift/utils/ordinal';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasCard, GasPlayer } from '../../../providers/GasProvider';
import { Card } from './Card';

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

const PlayerIcon = styled.div`
  font-size: 1.4rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
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

type Props = {
  players: GasPlayer[];
  currentPlayerId: string;
  currentCard?: GasCard;
  gameOver: boolean;
  winningPlayerId: string | undefined;
};

export function PlayerList({
  players,
  currentPlayerId,
  currentCard,
  gameOver,
  winningPlayerId,
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
            {active && currentCard && !gameOver && p.status === 'alive' && (
              <CardContainer>
                <Card card={currentCard} />
              </CardContainer>
            )}
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
            {/* {p.status === 'dead' && <PlayerIcon>☠️</PlayerIcon>} */}
            {p.status === 'winner' && <PlayerIcon>🎉</PlayerIcon>}
          </PlayerListItem>
        );
      })}
    </PlayerListContainer>
  );
}
