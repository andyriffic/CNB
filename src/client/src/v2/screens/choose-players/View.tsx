import { NavigateFn } from '@reach/router';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { SplashText } from '../../components/SplashText';
import { PositionedArea } from '../../components/PositionedArea';
import { Button } from '../../components/ui/buttons';
import { GameScreen } from '../../components/ui/GameScreen';
import { useCreateGame } from './hooks/useCreateGame';
import { usePlayerSelector } from './hooks/usePlayerSelector';
import { usePlayerStateWithInvitation } from './hooks/usePlayerStateWithInvitation';
import { useSelectedPlayerState } from './hooks/useSelectedPlayerState';
import { useSound } from './hooks/useSound';
import { SlideyPlayerSwitcher } from './components/SlideyPlayerSwitcher';
import { PlayQrCode } from './components/PlayQrCode';
import { useSoundProvider } from '../../providers/SoundProvider';

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
  const { play } = useSoundProvider();

  useSound(invitation, playerConfirmed, play);

  if (!invitation) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={false}>
      <Container>
        <PlayQrCode />
        {/* Players */}
        <SlideyPlayerSwitcher
          pos="left"
          player={playerState.players[0]}
          confirmed={playerConfirmed[0]}
        />
        <SlideyPlayerSwitcher
          pos="right"
          player={playerState.players[1]}
          confirmed={playerConfirmed[1]}
        />

        <SplashText>Today's players</SplashText>

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
                navigate &&
                  navigate(`/v2/spectator/${matchupId}?feature=tug-o-war`);
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
