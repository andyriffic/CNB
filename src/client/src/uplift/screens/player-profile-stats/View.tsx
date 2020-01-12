import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { PlayerStatsRecord } from '../../types';
import { selectRandomOneOf } from '../../utils/random';
import { PlayerStatsProfile } from './PlayerStatsProfile';

const MatchupsContainer = styled.div`
  width: 790px;
  margin: 0 auto;
  display: flex;
`;

export default ({ navigate }: RouteComponentProps) => {
  const [loadingStats, playerStats] = usePlayerStats();
  const [randomPlayerStats, setRandomPlayerStats] = useState<
    PlayerStatsRecord | undefined
  >();

  useEffect(() => {
    if (playerStats && !randomPlayerStats) {
      setRandomPlayerStats(selectRandomOneOf(playerStats.result));
    }
  }, [playerStats, randomPlayerStats]);

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="Cowboy/Ninja/Bear 2020" alignTop={true}>
        <GameSettingsDrawer />
        <MatchupsContainer>
          {randomPlayerStats && (
            <PlayerStatsProfile playerStats={randomPlayerStats} />
          )}
        </MatchupsContainer>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
