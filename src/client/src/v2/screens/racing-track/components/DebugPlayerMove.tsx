import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/ui/buttons';
import { GAME_PHASE } from '../providers/racingTrackReducer';
import { RacingTrackService } from '../providers/RacingTrackSerivce';

const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
`;

type Props = {
  racingTrackService: RacingTrackService;
  speed: number;
};

export const DebugPlayerMove = ({
  racingTrackService,
  speed,
}: Props): JSX.Element => {
  const [autoMove, setAutoMove] = useState(false);

  useEffect(() => {
    if (racingTrackService.allPlayersMoved || !autoMove) {
      return;
    }
    const interval = setInterval(() => {
      console.log('Auto Move Player Tick');

      racingTrackService.autoMovePlayerTick();
    }, speed);
    return () => clearInterval(interval);
  }, [autoMove, racingTrackService.allPlayersMoved]);

  useEffect(() => {
    if (racingTrackService.gamePhase === GAME_PHASE.FINISHED_ROUND) {
      console.log('Saving Player State');

      racingTrackService.savePlayerState();
    }
  }, [racingTrackService.gamePhase]);

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
      <Button
        onClick={() => setAutoMove(true)}
        disabled={racingTrackService.gamePhase !== GAME_PHASE.NOT_STARTED}
      >
        Start Race 🏁
      </Button>
    </Container>
  );
};
