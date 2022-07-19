import React from 'react';
import styled, { css } from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasGame } from '../../../providers/GasProvider';
import tombstoneImage from './assets/tombstone.png';
import { GraveyardPlayer } from './GraveyardPlayer';

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
`;

const GraveyardPlayerContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const GraveyardPlayerItem = styled.div`
  animation: ${slideInUpAnimation} 600ms linear 1000ms both;
`;

type Props = {
  game: GasGame;
};

export function Graveyard({ game }: Props): JSX.Element {
  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <img src={tombstoneImage} alt="tombstone" />
      </div>
      <GraveyardPlayerContainer>
        {game.allPlayers
          .filter(p => p.status === 'dead')
          .map(p => {
            return (
              <GraveyardPlayerItem key={p.player.id}>
                <GraveyardPlayer player={p} game={game} />
              </GraveyardPlayerItem>
            );
          })}
      </GraveyardPlayerContainer>
    </Container>
  );
}
