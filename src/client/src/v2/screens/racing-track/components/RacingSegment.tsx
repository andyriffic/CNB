import React from 'react';
import styled from 'styled-components';
import { RacingTrackSection } from '../types';
import { RacingLane } from './RacingLane';

const PositionContainer = styled.div`
  position: absolute;
`;

type Props = {
  section: RacingTrackSection;
};

export const RacingSegment = ({ section }: Props): JSX.Element => {
  return (
    <>
      {/* {section.catchupBonusMoves && (
        <PositionContainer
          style={{
            top: `${section.lanes[0].squares[0].coordinates.y}px`,
            left: `${section.lanes[0].squares[0].coordinates.x}px`,
          }}
        >
          {section.catchupBonusMoves}
        </PositionContainer>
      )} */}
      {section.lanes.map((lane, i) => (
        <RacingLane key={i} lane={lane} section={section} />
      ))}
    </>
  );
};
