import React from 'react';
import styled from 'styled-components';
import { RacingPlayer, RacingTrack } from '../types';
import raceCar from '../assets/race-car-formula-1-red.png';
import { RacingCar } from './RacingCar';

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

  return (
    <PositionContainer
      speed={speed}
      style={{
        top: `${square.coordinates.y - OFFSET_Y_PX}px`,
        left: `${square.coordinates.x - OFFSET_X_PX}px`,
      }}
    >
      <Container>
        <div
          style={{
            transform: `rotate(${section.rotationDegrees}deg)`,
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
        {racingPlayer.passedAnotherRacer && <Blocked>Overtaken!</Blocked>}

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
        <PlayerName>{racingPlayer.player.name}</PlayerName>
      </Container>
    </PositionContainer>
  );
};
