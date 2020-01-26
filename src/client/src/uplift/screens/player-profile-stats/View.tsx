import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { selectRandomOneOf } from '../../utils/random';
import { PlayerStatsProfile } from './PlayerStatsProfile';
import { useGroupedStatsWithRanking } from '../../hooks/useGroupedStatsWithRanking';
import { PlayerStatsRecordWithRanking } from '../../types';

const MatchupsContainer = styled.div`
  width: 790px;
  margin: 0 auto;
  display: flex;
`;

export default ({ navigate }: RouteComponentProps) => {
  const [groupedStatsWithRanking] = useGroupedStatsWithRanking();
  const [randomPlayerStats, setRandomPlayerStats] = useState<
    PlayerStatsRecordWithRanking | undefined
  >();
  const [playerPosition, setPlayerPosition] = useState<number | undefined>();

  useEffect(() => {
    if (groupedStatsWithRanking && !randomPlayerStats) {
      const randomPositionGroup = selectRandomOneOf(groupedStatsWithRanking);
      const position = groupedStatsWithRanking.indexOf(randomPositionGroup);
      const randomStats = selectRandomOneOf(randomPositionGroup);
      setRandomPlayerStats(randomStats);
      setPlayerPosition(position + 1);
    }
  }, [groupedStatsWithRanking, randomPlayerStats]);

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="Cowboy/Ninja/Bear 2020" alignTop={true}>
        <GameSettingsDrawer />
        <MatchupsContainer>
          {randomPlayerStats && (
            <PlayerStatsProfile
              playerStats={randomPlayerStats}
              position={playerPosition}
            />
          )}
        </MatchupsContainer>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
