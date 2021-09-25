import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RacingTrackService } from '../providers/RacingTrackSerivce';

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
`;

type Props = {
  racingTrackService: RacingTrackService;
};

export const DebugRacerHistory = ({
  racingTrackService,
}: Props): JSX.Element => {
  return (
    <Container>
      <h3>Racing history</h3>
      {racingTrackService.racerHistory.map((h, i) => {
        return (
          <dl>
            <dt>player</dt>
            <dd>
              {h.playerId} ({h.movesRemaining})
            </dd>
            <dt>position</dt>
            <dd>
              {h.position.sectionIndex}:{h.position.laneIndex}:
              {h.position.squareIndex}
            </dd>
          </dl>
        );
      })}
    </Container>
  );
};
