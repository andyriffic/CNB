import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { RacingTrackServiceProvider } from './providers/RacingTrackSerivce';
import { racingTrack as track4 } from './tracks/track2';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { RacingTrack } from './types';
import { shuffleArray } from '../../../uplift/utils/random';

export const RacingTrackScreen = ({ location }: RouteComponentProps) => {
  const { allPlayers, updatePlayer } = usePlayersProvider();

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
      racingTrack={track4}
      participatingPlayers={participatingPlayers}
      savePlayer={savePlayer}
    >
      <View />
    </RacingTrackServiceProvider>
  );
};
