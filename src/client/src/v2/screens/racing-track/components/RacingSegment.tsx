import React from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../../featureToggle';
import { RacingTrackSection } from '../types';
import { RacingLane } from './RacingLane';

const PositionContainer = styled.div`
  position: absolute;
`;

type Props = {
  section: RacingTrackSection;
  index: number;
};

const debug = isFeatureEnabled('debug');

export const RacingSegment = ({ section, index }: Props): JSX.Element => {
  return (
    <>
      {debug && (
        <PositionContainer
          style={{
            top: `${section.lanes[0].squares[0].coordinates.y}px`,
            left: `${section.lanes[0].squares[0].coordinates.x}px`,
          }}
        >
          {index}
        </PositionContainer>
      )}
      {section.lanes.map((lane, i) => (
        <RacingLane key={i} lane={lane} section={section} />
      ))}
    </>
  );
};
