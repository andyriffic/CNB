import React from 'react';
import styled, { css } from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasPlayer } from '../../../providers/GasProvider';

const PlayerListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PlayerListItem = styled.div<{ active: boolean }>`
  ${({ theme, active }) =>
    active &&
    css`
      background-color: ${theme.color.background03};
    `}
`;

type Props = {
  players: GasPlayer[];
  currentPlayerId: string;
};

export function PlayerList({ players, currentPlayerId }: Props): JSX.Element {
  return (
    <PlayerListContainer>
      {players.map(p => (
        <PlayerListItem
          key={p.player.id}
          active={p.player.id === currentPlayerId}
        >
          <PlayerAvatar player={p.player} size="small" showZodiac={false} />
        </PlayerListItem>
      ))}
    </PlayerListContainer>
  );
}
