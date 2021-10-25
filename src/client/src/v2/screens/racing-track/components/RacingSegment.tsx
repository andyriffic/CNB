import React from 'react';
import styled from 'styled-components';
import { RacingTrackSection } from '../types';
import { RacingLane } from './RacingLane';

const PositionContainer = styled.div`
  position: absolute;
`;

type Props = {
  section: RacingTrackSection;
  index: number;
};

export const RacingSegment = ({ section, index }: Props): JSX.Element => {
  return (
    <>
      {/* <PositionContainer
        style={{
          top: `${section.lanes[0].squares[0].coordinates.y}px`,
          left: `${section.lanes[0].squares[0].coordinates.x}px`,
        }}
      >
        {index}
      </PositionContainer> */}
      {section.lanes.map((lane, i) => (
        <RacingLane key={i} lane={lane} section={section} />
      ))}
    </>
  );
};
