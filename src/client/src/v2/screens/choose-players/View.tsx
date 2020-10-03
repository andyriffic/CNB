import { NavigateFn } from '@reach/router';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { SplashText } from '../../../uplift/components/SplashText';
import { PositionedArea } from '../../components/PositionedArea';
import { Button } from '../../components/ui/buttons';
import { GameScreen } from '../../components/ui/GameScreen';
import { PlayerAvatar } from './components/PlayerAvatar';
import { useCreateGame } from './hooks/useCreateGame';
import { usePlayerSelector } from './hooks/usePlayerSelector';
import { usePlayerStateWithInvitation } from './hooks/usePlayerStateWithInvitation';
import { useSelectedPlayerState } from './hooks/useSelectedPlayerState';
import { useSound } from './hooks/useSound';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const View = ({ navigate }: { navigate: NavigateFn | undefined }) => {
  const playerSelector = usePlayerSelector();
  const playerState = useSelectedPlayerState(playerSelector);
  const {
    invitation,
    switchPlayer,
    playerConfirmed,
    bothPlayersReady,
  } = usePlayerStateWithInvitation(playerState);
  const { startGame } = useCreateGame(invitation);

  useSound(invitation, playerConfirmed);

  if (!invitation) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={false}>
      <Container>
        {/* Players */}
        <PositionedArea position={{ left: 0, top: 10 }}>
          {playerState.players[0] && (
            <PlayerAvatar
              confirmed={playerConfirmed[0]}
              player={playerState.players[0]}
            />
          )}
        </PositionedArea>
        <PositionedArea position={{ right: 0, top: 10 }} flipX={true}>
          {playerState.players[1] && (
            <PlayerAvatar
              confirmed={playerConfirmed[1]}
              player={playerState.players[1]}
            />
          )}
        </PositionedArea>
        {/* Actions */}
        {!playerConfirmed[0] && (
          <PositionedArea position={{ left: 0, bottom: 10 }}>
            <Button onClick={() => switchPlayer[0]()}>Next player</Button>
          </PositionedArea>
        )}
        {!playerConfirmed[1] && (
          <PositionedArea position={{ right: 0, bottom: 10 }}>
            <Button onClick={() => switchPlayer[1]()}>Next player</Button>
          </PositionedArea>
        )}
        {bothPlayersReady && (
          <SplashText
            onComplete={() => {
              startGame('rock-paper-scissors-classic', matchupId => {
                navigate && navigate(`/spectator/${matchupId}`);
              });
            }}
          >
            Let's go!
          </SplashText>
        )}
      </Container>
    </GameScreen>
  );
};

export default View;
