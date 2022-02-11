import React from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { RacingTrackBackground } from './components/RacingTrackBackground';

import { RacingSegment } from './components/RacingSegment';
import { useRacingTrack } from './providers/RacingTrackSerivce';
import { RacingTrackPlayer } from './components/RacingTrackPlayer';
import { DebugPlayerMove } from './components/DebugPlayerMove';
import { isFeatureEnabled } from '../../../featureToggle';
import RacingReplay from './replay';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { WinnersPodium } from './components/WinnersPodium';

const showReplay = isFeatureEnabled('replay');

const RACING_SPEED_MS = 500;

const Container = styled.div`
  margin: 0 auto;
`;

const View = () => {
  const racingTrackService = useRacingTrack();
  const { allPlayers } = usePlayersProvider();

  if (showReplay && allPlayers.length) {
    return <RacingReplay allPlayers={allPlayers} />;
  }

  return (
    <GameScreen scrollable={false}>
      <DebugPlayerMove
        racingTrackService={racingTrackService}
        speed={RACING_SPEED_MS}
      />
      <Container>
        <RacingTrackBackground racingTrack={racingTrackService.racingTrack}>
          {racingTrackService.racingTrack.sections.map((section, i) => (
            <RacingSegment key={i} section={section} index={i} />
          ))}
          {racingTrackService.racers.map(racer => (
            <RacingTrackPlayer
              key={racer.player.id}
              racingPlayer={racer}
              racingTrack={racingTrackService.racingTrack}
              speed={RACING_SPEED_MS}
              isMoving={racer.player.id === racingTrackService.movingPlayerId}
            />
          ))}
          <WinnersPodium
            racers={racingTrackService.racers}
            displayPositions={
              racingTrackService.racingTrack.winningDisplayPositions
            }
          />
        </RacingTrackBackground>
      </Container>
    </GameScreen>
  );
};

export default View;
