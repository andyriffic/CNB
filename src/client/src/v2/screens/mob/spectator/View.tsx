import { NavigateFn } from '@reach/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { PlayerAvatar } from '../../../components/player-avatar';
import { FeatureText } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobGame } from '../../../providers/hooks/useMobGame';
import { useMobProvider } from '../../../providers/MobProvider';
import { MobPlayerAvatar } from './MobPlayerAvatar';
import { MugPlayerAvatar } from './MugPlayerAvatar';

const Container = styled.div`
  margin: 0 auto 50px auto;
`;

type Props = {
  mobGameId: string;
};

export default ({ mobGameId }: Props) => {
  const { mobGame } = useMobGame(mobGameId);

  if (!mobGame) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        <FeatureText>{mobGame.id}</FeatureText>
        <MugPlayerAvatar mugPlayer={mobGame.mugPlayer} />
        <ul style={{ display: 'flex' }}>
          {mobGame.mobPlayers.map(p => (
            <MobPlayerAvatar key={p.player.id} mobPlayer={p} />
          ))}
        </ul>
      </Container>
    </GameScreen>
  );
};
