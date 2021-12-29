import React from 'react';
import styled, { css } from 'styled-components';
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

const PlayerListItem = styled.div<{ active: boolean }>`
  position: relative;
  ${({ theme, active }) =>
    active &&
    css`
      background-color: ${theme.color.background03};
    `}
`;

type Props = {
  players: GasPlayer[];
  currentPlayerId: string;
  currentCard?: GasCard;
};

export function PlayerList({
  players,
  currentPlayerId,
  currentCard,
}: Props): JSX.Element {
  return (
    <PlayerListContainer>
      {players.map(p => {
        const active = p.player.id === currentPlayerId;
        return (
          <PlayerListItem key={p.player.id} active={active}>
            {active && currentCard && (
              <CardContainer>
                <Card card={currentCard} />
              </CardContainer>
            )}
            <PlayerAvatar player={p.player} size="small" showZodiac={false} />
            {p.status === 'dead' && <div>☠️</div>}
            {p.status === 'winner' && <div>🎉</div>}
          </PlayerListItem>
        );
      })}
    </PlayerListContainer>
  );
}
