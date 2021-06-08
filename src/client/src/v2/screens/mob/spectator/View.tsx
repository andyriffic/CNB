import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useTimedPlayState } from './hooks/useTimedPlayState';
import { MobCongaLine } from './MobCongaLine';
import { MobWaitingMoves } from './MobWaitingMoves';
import { MobPlayerDebug } from './MobPlayerDebug';
import { MugPlayerAvatar } from './MugPlayerAvatar';
import { useMobSpectatorSound } from './hooks/useMobSpectatorSound';

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
  const { resolveMobGame, nextRound, viewedRound } = useMobProvider();
  const uiState = useMobSpectatorViewUiState(mobGame);
  const { playState } = useTimedPlayState(mobGame);
  useMobSpectatorSound(mobGame);

  const activeMobPlayers = useMemo<MobPlayer[]>(() => {
    if (!mobGame) return [];
    return mobGame.mobPlayers.filter(mp => mp.lastRound === mobGame.round);
  }, [mobGame]);

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
            {playState === 'revealing-moves' && (
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
            {/* {playState === 'waiting-moves' && (
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
            )} */}
          </MobContainer>
        </PlayersContainer>
        {mobGame.resolved && !(uiState.mobWinner || uiState.mugWinner) && (
          <Button onClick={startNewRound}>Next round</Button>
        )}
        {mobGame.ready && !mobGame.resolved && (
          <Button onClick={() => resolveMobGame(mobGame.id)}>Ready</Button>
        )}
      </Container>
    </GameScreen>
  );
};
