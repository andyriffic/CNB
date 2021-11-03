import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { RacingPlayer, RacingTrack } from '../types';
import tinycolor from 'tinycolor2';
import {
  inOutAnimation,
  flashAnimation,
} from '../../../../uplift/components/animations';
import { PlayerCustomisedCar } from './PlayerCustomisedCar';
import { isFeatureEnabled } from '../../../../featureToggle';

const OFFSET_X_PX = 30;
const OFFSET_Y_PX = 30;

const carScales: { [key: number]: number } = { 0: 1.1, 8: 1, 12: 0.8 };

const scaleCarFeature = isFeatureEnabled('carscale');

const getScale = (index: number): number => {
  let scale = 1;
  Object.keys(carScales).forEach(s => {
    const sInt = parseInt(s);
    if (index >= sInt) {
      scale = carScales[sInt];
    }
  });
  return scale;
};

const PositionContainer = styled.div<{ speed: number }>`
  position: absolute;
  transition: all ${({ speed }) => speed}ms ease-in-out;
`;

const Container = styled.div`
  position: relative;
`;

const MovingIndicator = styled.div`
  background-color: transparent;
  text-transform: uppercase;
  padding: 3px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  bottom: -10px;
  left: 10px;
  animation: ${flashAnimation} 1000ms ease-in-out both;
`;

const MovesRemaining = styled.div`
  position: absolute;
  bottom: 0;
  background: steelblue;
  color: white;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.6rem;
  text-align: center;
  font-weight: bold;
`;

const FrozenTurnsRemaining = styled.div`
  position: absolute;
  top: 0;
  background: blueviolet;
  color: white;
`;

const PlayerName = styled.div`
  background-color: white;
  text-transform: uppercase;
  color: red;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.4rem;
  text-align: center;
  position: absolute;
  top: -16px;
  border: 1px solid;
  white-space: nowrap;
`;

const Blocked = styled.div`
  background-color: white;
  text-transform: uppercase;
  color: red;
  padding: 3px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  bottom: -16px;
  animation: ${inOutAnimation} 1000ms ease-in-out both;
`;

type Props = {
  racingPlayer: RacingPlayer;
  racingTrack: RacingTrack;
  speed: number;
  isMoving: boolean;
};

export const RacingTrackPlayer = ({
  racingPlayer,
  racingTrack,
  speed,
  isMoving,
}: Props): JSX.Element => {
  const section = racingTrack.sections[racingPlayer.position.sectionIndex];
  const lane = section.lanes[racingPlayer.position.laneIndex];
  const square = lane.squares[racingPlayer.position.squareIndex];

  const x = square.coordinates.x - OFFSET_X_PX;
  const y = square.coordinates.y - OFFSET_Y_PX;
  const rotationDeg = section.rotationDegrees;
  const accentColor = tinycolor
    .mostReadable(racingPlayer.carColor, ['#fff', '#000'])
    .toHexString();

  return (
    <PositionContainer
      speed={speed}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        zIndex: isMoving ? 1 : 0,
      }}
    >
      <Container>
        <div
          style={{
            transform: `rotate(${rotationDeg}deg)`,
            transition: 'transform 200ms ease-in',
          }}
        >
          {scaleCarFeature ? (
            <div
              style={{
                transition: 'transform: 600ms linear',
                transform: `scale(${getScale(
                  racingPlayer.position.sectionIndex
                )})`,
              }}
            >
              <PlayerCustomisedCar racingPlayer={racingPlayer} />
            </div>
          ) : (
            <PlayerCustomisedCar racingPlayer={racingPlayer} />
          )}
        </div>
        {racingPlayer.movesRemaining > 0 && (
          <MovesRemaining>{racingPlayer.movesRemaining}</MovesRemaining>
        )}
        {/* {racingPlayer.isMoving && <MovingIndicator>✨</MovingIndicator>} */}
        {racingPlayer.blocked && <Blocked>🤬</Blocked>}
        {racingPlayer.gotBonusMoves && <Blocked>🎉</Blocked>}
        {racingPlayer.finishPosition ? <Blocked>🏁</Blocked> : false}
        {/* {racingPlayer.passedAnotherRacer && <Blocked>Overtaken!</Blocked>} */}
        <PlayerName
          style={{
            backgroundColor: racingPlayer.carColor,
            borderColor: accentColor,
            color: accentColor,
          }}
        >
          {racingPlayer.player.name}
        </PlayerName>
      </Container>
    </PositionContainer>
  );
};
