import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FancyLink } from '../../../../components/FancyLink';
import { isFeatureEnabled } from '../../../../featureToggle';
import { Button } from '../../../components/ui/buttons';
import { GAME_PHASE } from '../providers/racingTrackReducer';
import { RacingTrackService } from '../providers/RacingTrackSerivce';

const dontSave = isFeatureEnabled('no-save');

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

  const finishedPlayers = useMemo(() => {
    const finishers = racingTrackService.racers.filter(
      rp => !!rp.finishPosition
    );
    return finishers;
  }, [racingTrackService.racers]);

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

  // useEffect(() => {
  //   if (racingTrackService.gamePhase === GAME_PHASE.FINISHED_ROUND) {
  //     console.log('Saving Player State', !dontSave);

  //     !dontSave && racingTrackService.savePlayerState();
  //   }
  // }, [racingTrackService.gamePhase]);

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
      <div>
        <Button
          onClick={() => setAutoMove(true)}
          disabled={racingTrackService.gamePhase !== GAME_PHASE.NOT_STARTED}
        >
          Start Race 🏁
        </Button>
      </div>
      {finishedPlayers.length >= 6 && (
        <div>
          <FancyLink href="/gas/start?feature=race-track-winners">
            Final Showdown! 🏁
          </FancyLink>
        </div>
      )}
    </Container>
  );
};
