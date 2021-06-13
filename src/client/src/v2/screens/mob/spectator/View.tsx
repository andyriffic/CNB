import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { SplashText } from '../../../components/SplashText';
import { Button } from '../../../components/ui/buttons';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobGame } from '../../../providers/hooks/useMobGame';
import {
  MobGame,
  MobPlayer,
  useMobProvider,
} from '../../../providers/MobProvider';
import {
  UiMobPlayer,
  useMobSpectatorViewUiState,
} from './hooks/useMobSpectatorViewUiState';
import { useTimedPlayState } from './hooks/useTimedPlayState';
import { MobCongaLine } from './MobCongaLine';
import { MobWaitingMoves } from './MobWaitingMoves';
import { MobPlayerDebug } from './MobPlayerDebug';
import { MugPlayerAvatar } from './MugPlayerAvatar';
import { useMobSpectatorSound } from './hooks/useMobSpectatorSound';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { FeatureText } from '../../../components/ui/Atoms';

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

const getMobStartMessage = (mobGame: MobGame): string => {
  const remainingMobPlayers = mobGame.mobPlayers.filter(mp => mp.active);
  if (remainingMobPlayers.length === 1) {
    return `Here comes ${remainingMobPlayers[0].player.name}!`;
  }

  return 'Here comes the Mob!';
};

export default ({ mobGameId }: Props) => {
  const { play } = useSoundProvider();
  const { mobGame } = useMobGame(mobGameId);
  const { resolveMobGame, nextRound, viewedRound } = useMobProvider();
  const uiState = useMobSpectatorViewUiState(mobGame);
  const { playState } = useTimedPlayState(mobGame);
  const lastResolvedRound = useRef(0);
  useMobSpectatorSound(mobGame, uiState);

  const activeMobPlayers = useMemo<MobPlayer[]>(() => {
    if (!mobGame) return [];
    return mobGame.mobPlayers.filter(mp => mp.lastRound === mobGame.round);
  }, [mobGame]);

  useEffect(() => {
    if (
      !mobGame ||
      mobGame.roundState !== 'viewed' ||
      uiState.mobWinner ||
      uiState.mugWinner ||
      lastResolvedRound.current === mobGame.round
    ) {
      return;
    }
    lastResolvedRound.current = mobGame.round;
    setTimeout(() => {
      nextRound(mobGame.id);
      uiState.newRound();
    }, 1000);
  }, [mobGame, uiState]);

  if (!mobGame) {
    return <LoadingSpinner />;
  }

  const startNewRound = () => {
    if (uiState.mobWinner || uiState.mugWinner) {
      return;
    }
    nextRound(mobGame.id);
    uiState.newRound();
  };

  return (
    <GameScreen scrollable={true}>
      <Container>
        {isPersistantFeatureEnabled('cnb-debug') && (
          <MobPlayerDebug mobGame={mobGame} />
        )}
        {/* <div>
          {playState}:{mobGame.roundState}
        </div> */}
        <PlayersContainer>
          <MugContainer>
            <MugPlayerAvatar
              mugPlayer={mobGame.mugPlayer}
              revealMove={mobGame.resolved}
              winner={
                uiState.mugWinner &&
                !!mobGame &&
                mobGame.roundState === 'viewed'
              }
              loser={
                uiState.mobWinner &&
                !!mobGame &&
                mobGame.roundState === 'viewed'
              }
            />
          </MugContainer>
          <MobContainer>
            {playState === 'revealing-moves' &&
              mobGame.roundState !== 'viewed' && (
                <MobCongaLine
                  activePlayers={activeMobPlayers}
                  onComplete={() => {
                    mobGame && viewedRound(mobGame.id);
                  }}
                />
              )}
            {['waiting-moves', 'ready-to-play'].includes(
              mobGame.roundState
            ) && <MobWaitingMoves activePlayers={activeMobPlayers} />}
          </MobContainer>
          {uiState.mugWinner && mobGame.roundState === 'viewed' && (
            <FeatureText>You beat the mob!</FeatureText>
          )}
          {uiState.mobWinner && mobGame.roundState === 'viewed' && (
            <FeatureText>The mob won</FeatureText>
          )}
        </PlayersContainer>
        {mobGame.resolved && !(uiState.mobWinner || uiState.mugWinner) && (
          <Button onClick={startNewRound}>Next round</Button>
        )}
        {mobGame.roundState === 'ready-to-play' && (
          <SplashText
            durationMilliseconds={3500}
            onComplete={() => {
              resolveMobGame(mobGame.id);
            }}
          >
            {getMobStartMessage(mobGame)}
          </SplashText>
        )}
      </Container>
    </GameScreen>
  );
};
