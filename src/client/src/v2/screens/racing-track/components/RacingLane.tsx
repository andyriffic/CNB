import React from 'react';
import { RacingTrackLane, RacingTrackSection } from '../types';
import { RacingSquare } from './RacingSquare';

type Props = {
  lane: RacingTrackLane;
  section: RacingTrackSection;
};

export const RacingLane = ({ lane, section }: Props): JSX.Element => {
  return (
    <>
      {lane.squares.map((square, i) => (
        <RacingSquare key={i} square={square} lane={lane} section={section} />
      ))}
    </>
  );
};
