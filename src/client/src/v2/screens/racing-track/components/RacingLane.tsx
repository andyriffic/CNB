import React from 'react';
import { RacingTrackLane } from '../types';
import { RacingSquare } from './RacingSquare';

type Props = {
  lane: RacingTrackLane;
};

export const RacingLane = ({ lane }: Props): JSX.Element => {
  return (
    <>
      {lane.squares.map((square, i) => (
        <RacingSquare key={i} square={square} />
      ))}
    </>
  );
};
