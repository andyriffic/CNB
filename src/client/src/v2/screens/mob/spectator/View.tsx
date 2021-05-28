import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { SplashText } from '../../../components/SplashText';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobGame } from '../../../providers/hooks/useMobGame';
import { MobPlayer, useMobProvider } from '../../../providers/MobProvider';
import {
  UiMobPlayer,
  useMobSpectatorViewUiState,
} from './hooks/useMobSpectatorViewUiState';
import { MobPlayerAvatar } from './MobPlayerAvatar';
import { MobPlayerDebug } from './MobPlayerDebug';
import { MugPlayerAvatar } from './MugPlayerAvatar';

const Container = styled.div`
  margin: 50px auto 50px auto;
`;

type Props = {
  mobGameId: string;
};

const getPlayerRevealMove = (
  playerId: string,
  uiMobPlayers: UiMobPlayer[]
): boolean => {
  const uiPlayer = uiMobPlayers.find(p => p.playerId === playerId);
  return uiPlayer ? uiPlayer.revealMove : false;
};

export default ({ mobGameId }: Props) => {
  const { mobGame } = useMobGame(mobGameId);
  const { resolveMobGame, nextRound } = useMobProvider();
  const uiState = useMobSpectatorViewUiState(mobGame);

  useEffect(() => {
    if (
      mobGame &&
      mobGame.resolved &&
      !(uiState.mobWinner || uiState.mugWinner)
    ) {
      nextRound(mobGame.id);
      uiState.newRound();
    }
  }, [mobGame, uiState]);

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
          winner={uiState.mugWinner}
          loser={uiState.mobWinner}
        />
        <ul style={{ display: 'flex', justifyContent: 'center' }}>
          {mobGame.mobPlayers.map((mp, i) => (
            <MobPlayerAvatar
              key={mp.player.id}
              mobPlayer={mp}
              revealMove={getPlayerRevealMove(
                mp.player.id,
                uiState.uiMobPlayers
              )}
              winner={false}
              highlight={false}
            />
          ))}
        </ul>
        {/* {mobGame.resolved && !(uiState.mobWinner || uiState.mugWinner) && (
          <Button
            onClick={() => {
              nextRound(mobGame.id);
              uiState.newRound();
            }}
          >
            Next round
          </Button>
        )} */}
        {mobGame.ready && (
          <SplashText onComplete={() => resolveMobGame(mobGame.id)}>
            Ready
          </SplashText>
        )}
      </Container>
    </GameScreen>
  );
};
