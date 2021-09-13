import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { MobPlayer } from '../../../providers/MobProvider';
import tombstoneImage from './assets/loserville-city-sign.png';

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

const GraveyardPlayer = styled.div`
  animation: ${slideInUpAnimation} 600ms linear 1000ms both;
`;

const ReversedPlayerAvatar = styled.div`
  transform: scaleX(-1);
`;

type Props = {
  eliminatedPlayers: MobPlayer[];
};

export function MobGraveyard({ eliminatedPlayers }: Props): JSX.Element {
  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <img src={tombstoneImage} alt="tombstone" />
        <div
          style={{
            position: 'absolute',
            left: '84px',
            top: '39px',
            color: 'white',
            fontSize: '0.55rem',
          }}
        >
          {eliminatedPlayers.length}
        </div>
      </div>
      <GraveyardPlayerContainer>
        {eliminatedPlayers.map(p => {
          return (
            <GraveyardPlayer key={p.player.id}>
              <ReversedPlayerAvatar>
                <PlayerAvatar player={p.player} size="small" />
              </ReversedPlayerAvatar>
            </GraveyardPlayer>
          );
        })}
      </GraveyardPlayerContainer>
    </Container>
  );
}
