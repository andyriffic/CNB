import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RacingTrackService } from '../providers/RacingTrackSerivce';

const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
`;

type Props = {
  racingTrackService: RacingTrackService;
};

export const DebugPlayerMove = ({ racingTrackService }: Props): JSX.Element => {
  const [autoMove, setAutoMove] = useState(false);

  useEffect(() => {
    if (racingTrackService.allPlayersMoved || !autoMove) {
      return;
    }
    const interval = setInterval(() => {
      console.log('Auto Move Player Tick');

      racingTrackService.autoMovePlayerTick();
    }, 500);
    return () => clearInterval(interval);
  }, [autoMove, racingTrackService.allPlayersMoved]);

  // useEffect(() => {
  //   if (!gameBoardService.movingPlayer) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     console.log('MOVING PLAYER');
  //     gameBoardService.moveSelectedPlayer();
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, [gameBoardService.movingPlayer]);

  return (
    <Container>
      <button onClick={() => setAutoMove(true)}>Move All Players</button>
    </Container>
  );
};
