import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { RacingTrackServiceProvider } from './providers/RacingTrackSerivce';
import { racingTrack as track5 } from './tracks/track3';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { shuffleArray } from '../../../uplift/utils/random';
import { withDynamicRoadBlocks } from './dynamicTrack';
import { useDynamicSettings } from '../../hooks/useDynamicSettings';

export const RacingTrackScreen = ({ location }: RouteComponentProps) => {
  const { allPlayers, updatePlayer } = usePlayersProvider();
  const dynamicSettings = useDynamicSettings();
  const dynamicRaceTrack = useMemo(() => {
    return withDynamicRoadBlocks(
      track5,
      dynamicSettings.raceTrack.roadBlockSectionIndex
    );
  }, [dynamicSettings]);

  const participatingPlayers = useMemo(
    () => shuffleArray(allPlayers.filter(p => p.tags.includes('racer'))),
    [allPlayers]
  );

  const savePlayer = useCallback((playerId: string, tags: string[]) => {
    updatePlayer(playerId, tags);
  }, []);

  if (!participatingPlayers.length) {
    return <p>Loading...</p>;
  }

  return (
    <RacingTrackServiceProvider
      racingTrack={dynamicRaceTrack}
      participatingPlayers={participatingPlayers}
      savePlayer={savePlayer}
    >
      <View />
    </RacingTrackServiceProvider>
  );
};
