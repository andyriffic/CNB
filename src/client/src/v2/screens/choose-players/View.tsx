import { NavigateFn } from '@reach/router';
import React from 'react';
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
import { isPersistantFeatureEnabled } from '../../../featureToggle';
import { DebugJoinPlayers } from './components/DebugPlayer';
import { useThemeComponents } from '../../providers/hooks/useThemeComponents';
import { ShowThemedVariant } from '../../components/ShowThemedVariant';
import {
  SpookyGhost,
  SpookyPumpkin,
  SpookySpider,
} from '../../themes/halloween/HalloweenDecorations';

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
  const themeComponents = useThemeComponents();

  useSound(invitation, playerConfirmed, play);

  if (!(invitation && themeComponents)) {
    return <LoadingSpinner />;
  }

  return (
    <GameScreen scrollable={false}>
      <Container>
        <ShowThemedVariant placement="spectatorScreen" />
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
              startGame(themeComponents.moveThemeName, matchupId => {
                navigate && navigate(`/v2/spectator/${matchupId}`);
              });
            }}
          >
            Let's go!
          </SplashText>
        )}

        {isPersistantFeatureEnabled('cnb-debug') && (
          <PositionedArea position={{ top: 0, left: 0 }}>
            <DebugJoinPlayers invitation={invitation} />
          </PositionedArea>
        )}
      </Container>
    </GameScreen>
  );
};

export default View;
