import React from 'react';
import styled from 'styled-components';
import { RacingTrackSection } from '../types';
import { RacingLane } from './RacingLane';

type Props = {
  section: RacingTrackSection;
};

export const RacingSegment = ({ section }: Props): JSX.Element => {
  return (
    <>
      {section.lanes.map((lane, i) => (
        <RacingLane key={i} lane={lane} />
      ))}
    </>
  );
};
