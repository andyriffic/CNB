import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { SplashText } from '../../../components/SplashText';
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
import { FeatureText, SubHeading } from '../../../components/ui/Atoms';
import { MobResultSummary } from './MobResultSummary';
import { NewRecord } from './NewRecord';
import { MobGraveyard } from './MobGraveyard';
import { NavigateFn } from '@reach/router';
import { usePlayersProvider } from '../../../providers/PlayersProvider';
import { LinkToMiniGame } from '../../../components/LinkToMiniGame';

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

const GraveyardContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

type Props = {
  mobGameId: string;
  navigate: NavigateFn | undefined;
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
    return `Here comes ${remainingMobPlayers[0].playerId}!`;
  }

  return 'Here comes the Mob!';
};

export default ({ mobGameId, navigate }: Props) => {
  const { triggerUpdate } = usePlayersProvider();
  const { mobGame } = useMobGame(mobGameId);
  const { resolveMobGame, nextRound, viewedRound } = useMobProvider();
  const uiState = useMobSpectatorViewUiState(mobGame);
  const { playState } = useTimedPlayState(mobGame);
  const [syncPlayers, setSyncPlayers] = useState(false);
  const lastResolvedRound = useRef(0);
  useMobSpectatorSound(mobGame, uiState);
  // useDonkeyKongPoints(mobGame);

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

  useEffect(() => {
    if (mobGame && mobGame.gameOver && mobGame.roundState === 'viewed') {
      setSyncPlayers(true);
    }
  }, [mobGame]);

  useEffect(() => {
    if (syncPlayers) {
      console.log('Triggered Player Update 🤞');

      triggerUpdate();
    }
  }, [syncPlayers]);

  if (!mobGame) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        {isPersistantFeatureEnabled('cnb-debug') && (
          <MobPlayerDebug mobGame={mobGame} />
        )}
        {/* <div>
          {playState}:{mobGame.roundState}
        </div> */}
        {/* {uiState.mugWinner && mobGame.roundState === 'viewed' && (
          <FeatureText>
            {mobGame.mugPlayer.player.name} beat the mob!
          </FeatureText>
        )} */}

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
              roundState={mobGame.roundState}
              totalMobPlayers={mobGame.mobPlayers.length}
              totalActiveMobPlayers={
                mobGame.mobPlayers.filter(mp => mp.active).length
              }
              points={mobGame.points.mugPlayer}
            />
          </MugContainer>
          <MobContainer>
            {playState === 'revealing-moves' &&
              mobGame.roundState !== 'viewed' && (
                <MobCongaLine
                  activePlayers={activeMobPlayers}
                  onPlayerEliminated={uiState.eliminatePlayer}
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
            <div>
              <FeatureText>
                {mobGame.mugPlayer.playerId} beat the mob!
              </FeatureText>
              <MobResultSummary mobGame={mobGame} />
            </div>
          )}
          {uiState.mobWinner && mobGame.roundState === 'viewed' && (
            <div>
              <FeatureText>The mob won</FeatureText>
              <MobResultSummary mobGame={mobGame} />
            </div>
          )}
        </PlayersContainer>
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
      {(mobGame.round < 3 || mobGame.roundState !== 'viewed') && (
        <GraveyardContainer>
          <MobGraveyard eliminatedPlayers={uiState.eliminatedPlayers} />
        </GraveyardContainer>
      )}
      <NewRecord
        playerId={mobGame.mugPlayer.playerId}
        lookupNewResult={
          uiState.mugWinner && !!mobGame && mobGame.roundState === 'viewed'
        }
      />
      {mobGame.gameOver && mobGame.roundState === 'viewed' && (
        <LinkToMiniGame />
      )}
    </GameScreen>
  );
};
