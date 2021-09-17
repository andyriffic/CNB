import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { RacingPlayer, RacingTrack } from '../types';
import raceCar from './race-car.png';

const OFFSET_X_PX = 30;
const OFFSET_Y_PX = 30;

const PositionContainer = styled.div`
  position: absolute;
  transition: all 250ms ease-in-out;
`;

const Container = styled.div`
  position: relative;
`;

const MovesRemaining = styled.div`
  position: absolute;
  bottom: 0;
  background: black;
  color: white;
`;

const FrozenTurnsRemaining = styled.div`
  position: absolute;
  top: 0;
  background: blueviolet;
  color: white;
`;

const PlayerName = styled.div`
  background-color: white;
  color: red;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.5rem;
  text-align: center;
  position: absolute;
  top: -20px;
`;

type Props = {
  racingPlayer: RacingPlayer;
  racingTrack: RacingTrack;
};

export const RacingTrackPlayer = ({
  racingPlayer,
  racingTrack,
}: Props): JSX.Element => {
  const section = racingTrack.sections[racingPlayer.position.sectionIndex];
  const lane = section.lanes[racingPlayer.position.laneIndex];
  const square = lane.squares[racingPlayer.position.squareIndex];

  return (
    <PositionContainer
      style={{
        top: `${square.coordinates.y - OFFSET_Y_PX}px`,
        left: `${square.coordinates.x - OFFSET_X_PX}px`,
      }}
    >
      <Container>
        <img
          src={raceCar}
          style={{ width: '45px', transform: 'rotate(180deg)' }}
        />
        {racingPlayer.movesRemaining > 0 && (
          <MovesRemaining>{racingPlayer.movesRemaining}</MovesRemaining>
        )}

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
        {gamePlayer.isMoving && (
          <PlayerName>{gamePlayer.player.name}</PlayerName>
        )}
        */}
      </Container>
    </PositionContainer>
  );
};
