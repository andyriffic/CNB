import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { RacingTrackServiceProvider } from './providers/RacingTrackSerivce';

import { racingTrack as track1 } from './tracks/test';
import { racingTrack as track2 } from './tracks/track2';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { isFeatureEnabled } from '../../../featureToggle';

const useTrack2 = isFeatureEnabled('track2');

const track = useTrack2 ? track2 : track1;

export const RacingTrackScreen = ({  }: RouteComponentProps) => {
  const { allPlayers, updatePlayer } = usePlayersProvider();

  const participatingPlayers = useMemo(
    () => allPlayers.filter(p => p.tags.includes('racer')),
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
      racingTrack={track}
      participatingPlayers={participatingPlayers}
      savePlayer={savePlayer}
    >
      <View />
    </RacingTrackServiceProvider>
  );
};
