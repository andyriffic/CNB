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
import { Player } from '../../../providers/PlayersProvider';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';

const RACING_SPEED_MS = 250;

const Container = styled.div`
  margin: 0 auto;
`;

type LocalState = {
  finished: boolean;
  currentHistoryIndex: number;
  history: RacerHistoryRecord[];
  historyRacers: RacingPlayer[];
  allPlayers: Player[];
};

const createHistoryRacer = (
  historyRecord: RacerHistoryRecord,
  player: Player
): RacingPlayer => {
  return {
    blocked: historyRecord.blocked,
    gotBonusMoves: false,
    carColor: getPlayerAttributeValue(player.tags, 'rt_color', '#fff'),
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

const reducer = (
  state: LocalState,
  action: { type: 'NEXT' } | { type: 'LOAD'; history: RacerHistoryRecord[] }
): LocalState => {
  switch (action.type) {
    case 'LOAD': {
      const allUniqueRacerIds = Array.from(
        new Set(action.history.map(h => h.playerId))
      );
      const initialRacers = allUniqueRacerIds.map(playerId => {
        const firstPosition = action.history.find(
          h => h.playerId === playerId
        )!;
        return createHistoryRacer(
          firstPosition,
          state.allPlayers.find(p => p.id === playerId)!
        );
      });
      return {
        ...state,
        history: action.history,
        historyRacers: initialRacers,
      };
    }
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

      if (!existingRacer) {
        throw 'No player found';
      }

      const updatedRacer: RacingPlayer = {
        ...existingRacer,
        position: nextHistoryRecord.position,
        movesRemaining: nextHistoryRecord.movesRemaining,
        blocked: nextHistoryRecord.blocked,
      };

      return {
        ...state,
        currentHistoryIndex: nextIndex,
        historyRacers: state.historyRacers.map(hr => {
          return hr.player.id === updatedRacer.player.id ? updatedRacer : hr;
        }),
      };

      // return {
      //   ...state,
      //   currentHistoryIndex: nextIndex,
      //   historyRacers: [
      //     ...state.historyRacers,
      //     createHistoryRacer(nextHistoryRecord),
      //   ],
      // };
    }
    default:
      return state;
  }
};

type Props = {
  allPlayers: Player[];
};

const View = ({ allPlayers }: Props) => {
  const racingHistory = useRacingHistory();
  const [state, dispatch] = useReducer(reducer, {
    finished: false,
    currentHistoryIndex: -1,
    history: [],
    historyRacers: [],
    allPlayers,
  });
  const [play, setPlay] = useState(false);
  const racingTrackService = useRacingTrack();

  useEffect(() => {
    if (play && !state.finished) {
      const interval = setInterval(() => {
        console.log('HISTORY TICK');

        dispatch({ type: 'NEXT' });
      }, RACING_SPEED_MS);

      return () => clearInterval(interval);
    }
  }, [play, state.finished]);

  useEffect(() => {
    if (!racingHistory.isLoading) {
      dispatch({ type: 'LOAD', history: racingHistory.flatHistory });
    }
  }, [racingHistory]);

  return (
    <GameScreen scrollable={false}>
      <div style={{ position: 'absolute', top: '50px', left: 0 }}>
        <Button
          onClick={() => setPlay(!play)}
          disabled={racingHistory.isLoading}
        >
          {play ? 'PAUSE' : 'PLAY'}
        </Button>
        <p style={{ fontSize: '0.6rem' }}>
          {racingHistory.isLoading
            ? 'Loading'
            : `Loaded (${racingHistory.flatHistory.length} records)`}
        </p>
        {!racingHistory.isLoading && (
          <p style={{ fontSize: '0.6rem' }}>
            Showing {state.currentHistoryIndex}/
            {racingHistory.flatHistory.length - 1}
          </p>
        )}
      </div>

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
              speed={RACING_SPEED_MS + 200}
              isMoving={racer.player.id === racingTrackService.movingPlayerId}
            />
          ))}
        </RacingTrackBackground>
      </Container>
    </GameScreen>
  );
};

export default View;
