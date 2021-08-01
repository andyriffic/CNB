import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { MobPlayer } from '../../../providers/MobProvider';
import tombstoneImage from './assets/tombstone.png';

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
      <img src={tombstoneImage} alt="tombstone" />
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
