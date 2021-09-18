import React from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { RacingTrackBackground } from './components/RacingTrackBackground';

import { RacingSegment } from './components/RacingSegment';
import { useRacingTrack } from './providers/RacingTrackSerivce';
import { RacingTrackPlayer } from './components/RacingTrackPlayer';
import { DebugPlayerMove } from './components/DebugPlayerMove';

const RACING_SPEED_MS = 800;

const Container = styled.div`
  margin: 0 auto;
`;

const View = () => {
  const racingTrackService = useRacingTrack();

  return (
    <GameScreen scrollable={false}>
      <DebugPlayerMove
        racingTrackService={racingTrackService}
        speed={RACING_SPEED_MS}
      />
      <Container>
        <RacingTrackBackground racingTrack={racingTrackService.racingTrack}>
          {racingTrackService.racingTrack.sections.map((section, i) => (
            <RacingSegment key={i} section={section} />
          ))}
          {racingTrackService.racers.map(racer => (
            <RacingTrackPlayer
              key={racer.player.id}
              racingPlayer={racer}
              racingTrack={racingTrackService.racingTrack}
              speed={RACING_SPEED_MS}
            />
          ))}
        </RacingTrackBackground>
      </Container>
    </GameScreen>
  );
};

export default View;
