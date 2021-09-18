import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { RacingTrackServiceProvider } from './providers/RacingTrackSerivce';

import { racingTrack } from './tracks/test';
import { usePlayersProvider } from '../../providers/PlayersProvider';

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
      racingTrack={racingTrack}
      participatingPlayers={participatingPlayers}
      savePlayer={savePlayer}
    >
      <View />
    </RacingTrackServiceProvider>
  );
};
