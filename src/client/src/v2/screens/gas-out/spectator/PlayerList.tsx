import React from 'react';
import styled from 'styled-components';
import { GasGame } from '../../../providers/GasProvider';
import { PlayerListPlayer } from './PlayerListPlayer';

const PlayerListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  height: 200px;
`;

type Props = {
  game: GasGame;
  gameOver: boolean;
};

export function PlayerList({ game, gameOver }: Props): JSX.Element {
  return (
    <PlayerListContainer>
      {game.allPlayers.map(p => {
        return (
          <PlayerListPlayer
            key={p.player.id}
            player={p}
            game={game}
            gameOver={gameOver}
          />
        );
      })}
    </PlayerListContainer>
  );
}
