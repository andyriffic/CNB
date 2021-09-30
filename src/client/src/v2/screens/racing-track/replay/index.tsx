import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../../components/ui/GameScreen';
import { RacingTrackBackground } from '../components/RacingTrackBackground';

import { RacingSegment } from '../components/RacingSegment';
import { useRacingTrack } from '../providers/RacingTrackSerivce';
import { RacingTrackPlayer } from '../components/RacingTrackPlayer';
import { DebugPlayerMove } from '../components/DebugPlayerMove';
import { useRacingHistory } from './useRacingHistory';
import { MainHeading } from '../../../../uplift/components/Heading';
import { Button } from '../../../components/ui/buttons';
import { RacerHistoryRecord, RacingPlayer } from '../types';

const RACING_SPEED_MS = 500;

const Container = styled.div`
  margin: 0 auto;
`;

type LocalState = {
  finished: boolean;
  currentHistoryIndex: number;
  history: RacerHistoryRecord[];
  historyRacers: RacingPlayer[];
};

const createHistoryRacer = (
  historyRecord: RacerHistoryRecord
): RacingPlayer => {
  return {
    blocked: false,
    gotBonusMoves: false,
    carColor: '#f00',
    carStyle: 'sports',
    isMoving: false,
    movesRemaining: historyRecord.movesRemaining,
    passedAnotherRacer: false,
    position: historyRecord.position,
    player: {
      avatarImageUrl: '',
      id: historyRecord.playerId,
      name: historyRecord.playerId,
      tags: [],
      teams: [],
    },
  };
};

const reducer = (state: LocalState, action: 'NEXT'): LocalState => {
  switch (action) {
    case 'NEXT': {
      const nextIndex = state.currentHistoryIndex + 1;
      const nextHistoryRecord = state.history[nextIndex];

      if (!nextHistoryRecord) {
        return {
          ...state,
          finished: true,
        };
      }

      const existingRacer = state.historyRacers.find(
        hr => hr.player.id === nextHistoryRecord.playerId
      );

      if (existingRacer) {
        const updatedRacer: RacingPlayer = {
          ...existingRacer,
          position: nextHistoryRecord.position,
          movesRemaining: nextHistoryRecord.movesRemaining,
        };

        return {
          ...state,
          currentHistoryIndex: nextIndex,
          historyRacers: state.historyRacers.map(hr => {
            return hr.player.id === updatedRacer.player.id ? updatedRacer : hr;
          }),
        };
      }

      return {
        ...state,
        currentHistoryIndex: nextIndex,
        historyRacers: [
          ...state.historyRacers,
          createHistoryRacer(nextHistoryRecord),
        ],
      };
    }
    default:
      return state;
  }
};

const View = () => {
  const racingHistory = useRacingHistory();
  const [state, dispatch] = useReducer(reducer, {
    finished: false,
    currentHistoryIndex: -1,
    history: racingHistory.flatHistory,
    historyRacers: [],
  });
  const [play, setPlay] = useState(false);
  const racingTrackService = useRacingTrack();

  useEffect(() => {
    if (play && !state.finished) {
      const interval = setInterval(() => {
        console.log('HISTORY TICK');

        dispatch('NEXT');
      }, 500);

      return () => clearInterval(interval);
    }
  }, [play, state.finished]);

  return (
    <GameScreen scrollable={false}>
      <MainHeading>Replay!</MainHeading>
      <Button onClick={() => setPlay(!play)}>{play ? 'PAUSE' : 'PLAY'}</Button>
      {/* <DebugPlayerMove
        racingTrackService={racingTrackService}
        speed={RACING_SPEED_MS}
      /> */}
      <Container>
        <RacingTrackBackground racingTrack={racingTrackService.racingTrack}>
          {racingTrackService.racingTrack.sections.map((section, i) => (
            <RacingSegment key={i} section={section} />
          ))}
          {state.historyRacers.map(racer => (
            <RacingTrackPlayer
              key={racer.player.id}
              racingPlayer={racer}
              racingTrack={racingTrackService.racingTrack}
              speed={RACING_SPEED_MS}
              isMoving={racer.player.id === racingTrackService.movingPlayerId}
            />
          ))}
        </RacingTrackBackground>
      </Container>
    </GameScreen>
  );
};

export default View;
