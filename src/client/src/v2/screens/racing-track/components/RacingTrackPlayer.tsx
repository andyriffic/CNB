import React from 'react';
import styled from 'styled-components';
import { RacingPlayer, RacingTrack } from '../types';
import raceCar from '../assets/race-car-formula-1-red.png';
import { RacingCar } from './RacingCar';
import tinycolor from 'tinycolor2';
import { inOutAnimation } from '../../../../uplift/components/animations';

const OFFSET_X_PX = 30;
const OFFSET_Y_PX = 30;

const PositionContainer = styled.div<{ speed: number }>`
  position: absolute;
  transition: all ${({ speed }) => speed}ms ease-in-out;
`;

const Container = styled.div`
  position: relative;
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
`;

const Blocked = styled.div`
  background-color: goldenrod;
  text-transform: uppercase;
  color: red;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.4rem;
  text-align: center;
  position: absolute;
  bottom: -16px;
  animation: ${inOutAnimation} 1000ms ease-in-out both;
`;

type Props = {
  racingPlayer: RacingPlayer;
  racingTrack: RacingTrack;
  speed: number;
};

export const RacingTrackPlayer = ({
  racingPlayer,
  racingTrack,
  speed,
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
      }}
    >
      <Container>
        <div
          style={{
            transform: `rotate(${rotationDeg}deg)`,
            transition: 'transform 200ms ease-in',
          }}
        >
          <RacingCar color={racingPlayer.carColor} />
        </div>
        {/* <img
          src={raceCar}
          style={{
            width: '45px',
            transform: `rotate(${section.rotationDegrees}deg)`,
            transition: 'transform 200ms ease-in',
          }}
        /> */}
        {racingPlayer.movesRemaining > 0 && (
          <MovesRemaining>{racingPlayer.movesRemaining}</MovesRemaining>
        )}
        {racingPlayer.blocked && <Blocked>Blocked!</Blocked>}
        {/* {racingPlayer.passedAnotherRacer && <Blocked>Overtaken!</Blocked>} */}

        {/* {racingPlayer.player.name} */}
        {/* <PlayerAvatar
          player={gamePlayer.player}
          size="small"
          showZodiac={false}
        />
        {gamePlayer.frozenTurnsRemaining > 0 && (
          <FrozenTurnsRemaining>
            {gamePlayer.frozenTurnsRemaining}
          </FrozenTurnsRemaining>
        )}
        */}
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
