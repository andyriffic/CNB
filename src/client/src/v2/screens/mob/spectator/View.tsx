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

const PlayersContainer = styled.div`
  display: flex;
`;
const MugContainer = styled.div`
  margin-right: 100px;
`;
const MobContainer = styled.div``;

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
  const resolvedRound = useRef(mobGame ? mobGame.round : 1);

  // useEffect(() => {
  //   if (
  //     mobGame &&
  //     mobGame.resolved &&
  //     mobGame.round === resolvedRound.current &&
  //     !(uiState.mobWinner || uiState.mugWinner)
  //   ) {
  //     resolvedRound.current = mobGame.round;
  //     nextRound(mobGame.id);
  //     uiState.newRound();
  //   }
  // }, [mobGame, uiState]);

  if (!mobGame) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        {isPersistantFeatureEnabled('cnb-debug') && (
          <MobPlayerDebug mobGame={mobGame} />
        )}
        <div>{uiState.playState}</div>
        <PlayersContainer>
          <MugContainer>
            <MugPlayerAvatar
              mugPlayer={mobGame.mugPlayer}
              revealMove={mobGame.resolved}
              winner={uiState.mugWinner}
              loser={uiState.mobWinner}
            />
          </MugContainer>
          <MobContainer>
            <ul
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {mobGame.mobPlayers.map((mp, i) => (
                <MobPlayerAvatar
                  key={mp.player.id}
                  mobPlayer={mp}
                  moved={!!mp.lastMoveId}
                  reveal={getPlayerRevealMove(
                    mp.player.id,
                    uiState.uiMobPlayers
                  )}
                  eliminated={!mp.active}
                  wonRound={!!mp.lastMoveId && mp.active}
                  wonGame={uiState.mobWinner && mp.active}
                />
              ))}
            </ul>
          </MobContainer>
        </PlayersContainer>
        {mobGame.resolved && !(uiState.mobWinner || uiState.mugWinner) && (
          <Button
            onClick={() => {
              nextRound(mobGame.id);
              uiState.newRound();
            }}
          >
            Next round
          </Button>
        )}
        {mobGame.ready && !mobGame.resolved && (
          <Button onClick={() => resolveMobGame(mobGame.id)}>Ready</Button>
        )}
      </Container>
    </GameScreen>
  );
};
