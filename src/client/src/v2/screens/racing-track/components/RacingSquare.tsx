import React from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../../featureToggle';
import { rainbowAnimation } from '../../../../uplift/components/animations';
import rockImage from './rock-track.png';
import {
  RacingTrackLane,
  RacingTrackSection,
  RackingTrackSquare,
} from '../types';

const CELL_SIZE_PX = 30;

const PositionContainer = styled.div`
  position: absolute;
`;

const Container = styled.div`
  /* border: 3px solid purple; */
  border-radius: 50%;
  position: relative;
  width: ${CELL_SIZE_PX}px;
  height: ${CELL_SIZE_PX}px;
`;

const Icon = styled.div`
  font-size: 1.2rem;
  background-color: white;
  border-radius: 50%;
`;

const PowerBoost = styled.div`
  position: absolute;
  bottom: 0;
  color: black;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.6rem;
  text-align: center;
  font-weight: bold;
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 1800% 1800%;
  animation: ${rainbowAnimation} 20s infinite;
`;

const LocationMarker = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: steelblue;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

type Props = {
  square: RackingTrackSquare;
  lane: RacingTrackLane;
  section: RacingTrackSection;
};

const debug = isFeatureEnabled('debug');

export const RacingSquare = ({ square, lane, section }: Props): JSX.Element => {
  return (
    <PositionContainer
      style={{
        top: `${square.coordinates.y - CELL_SIZE_PX}px`,
        left: `${square.coordinates.x - CELL_SIZE_PX}px`,
      }}
    >
      <Container>
        {debug && <LocationMarker />}
        {debug && (
          <div style={{ transform: `rotate(${section.rotationDegrees}deg)` }}>
            →
          </div>
        )}
        {square.type && square.type.type === 'rock' && (
          <div>
            <img src={rockImage} style={{ width: '30px' }} />
          </div>
        )}
        {square.type && square.type.type === 'boost' && (
          <PowerBoost>+{square.type.context}</PowerBoost>
        )}
      </Container>
    </PositionContainer>
  );
};
