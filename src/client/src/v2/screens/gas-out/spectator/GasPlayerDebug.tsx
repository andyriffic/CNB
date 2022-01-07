import React from 'react';
import styled, { css } from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import {
  GasGame,
  GasPlayer,
  useGasProvider,
} from '../../../providers/GasProvider';

const PlayerListContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
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
  game: GasGame;
};

export function GasPlayerDebug({ game }: Props): JSX.Element {
  const { playCard, pressGas } = useGasProvider();
  const activePlayers = game.allPlayers.filter(p => p.status !== 'dead');
  return (
    <PlayerListContainer>
      {activePlayers.map(p => {
        const active = p.player.id === game.currentPlayer.id;
        return (
          <PlayerListItem
            key={p.player.id}
            active={p.player.id === game.currentPlayer.id}
          >
            {p.player.name}
            <div>
              {p.cards.map((c, i) => (
                <button
                  disabled={!active || !!game.currentPlayer.cardPlayed}
                  key={i}
                  onClick={() => playCard(game.id, p.player.id, i)}
                >
                  ({c.type === 'press' ? c.presses : c.type})
                </button>
              ))}
              {active && game.currentPlayer.pressesRemaining > 0 && (
                <button onClick={() => pressGas(game.id)}>PRESS!</button>
              )}
            </div>
          </PlayerListItem>
        );
      })}
    </PlayerListContainer>
  );
}
