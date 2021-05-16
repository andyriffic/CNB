import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobGame } from '../../../providers/hooks/useMobGame';
import { useMobProvider } from '../../../providers/MobProvider';
import { MobPlayerAvatar } from './MobPlayerAvatar';
import { MobPlayerDebug } from './MobPlayerDebug';
import { MugPlayerAvatar } from './MugPlayerAvatar';

const Container = styled.div`
  margin: 50px auto 50px auto;
`;

type Props = {
  mobGameId: string;
};

export default ({ mobGameId }: Props) => {
  const { mobGame } = useMobGame(mobGameId);
  const { resolveMobGame, nextRound } = useMobProvider();
  const resolvedMobGameRound = useRef(false);

  useEffect(() => {
    if (mobGame && mobGame.ready && !resolvedMobGameRound.current) {
      resolvedMobGameRound.current = true;
      resolveMobGame(mobGame.id);
    }
  }, [mobGame]);

  const moveToNextRound = () => {
    if (!mobGame) {
      return;
    }
    nextRound(mobGame.id);
    resolvedMobGameRound.current = false;
  };

  const mugWinner =
    !!mobGame &&
    mobGame.resolved &&
    mobGame.mugPlayer.lives > 0 &&
    mobGame.mobPlayers.every(mp => !mp.active);

  const mobWinner = !!mobGame && mobGame.mugPlayer.lives === 0;

  if (!mobGame) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        {isPersistantFeatureEnabled('cnb-debug') && (
          <MobPlayerDebug mobGame={mobGame} />
        )}
        {/* <FeatureText>{mobGame.id}</FeatureText> */}
        <MugPlayerAvatar
          mugPlayer={mobGame.mugPlayer}
          revealMove={mobGame.resolved}
          winner={mugWinner}
          loser={mobWinner}
        />
        <ul style={{ display: 'flex' }}>
          {mobGame.mobPlayers.map(p => (
            <MobPlayerAvatar
              key={p.player.id}
              mobPlayer={p}
              revealMove={mobGame.resolved}
              winner={mobWinner && p.active}
            />
          ))}
        </ul>
        {mobGame.resolved && !(mobWinner || mugWinner) && (
          <Button onClick={moveToNextRound}>Next round</Button>
        )}
      </Container>
    </GameScreen>
  );
};
