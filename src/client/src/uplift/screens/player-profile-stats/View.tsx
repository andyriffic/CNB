import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { PlayerStatsRecord, PlayerStatsRecordWithRanking } from '../../types';
import { selectRandomOneOf } from '../../utils/random';
import { PlayerStatsProfile } from './PlayerStatsProfile';
import { rankPlayers, groupRankings } from './ranking';

const MatchupsContainer = styled.div`
  width: 790px;
  margin: 0 auto;
  display: flex;
`;

export default ({ navigate }: RouteComponentProps) => {
  const [loadingPlayerStats, playerStats] = usePlayerStats();
  const [randomPlayerStats, setRandomPlayerStats] = useState<
    PlayerStatsRecordWithRanking | undefined
  >();
  const [playerPosition, setPlayerPosition] = useState<number | undefined>();

  useEffect(() => {
    if (playerStats && !randomPlayerStats) {
      const rankedPlayers = rankPlayers(playerStats.result);
      const groupedRankedPlayers = groupRankings(rankedPlayers);

      const randomPositionGroup = selectRandomOneOf(groupedRankedPlayers);
      const position = groupedRankedPlayers.indexOf(randomPositionGroup);
      const randomStats = selectRandomOneOf(randomPositionGroup);
      setRandomPlayerStats(randomStats);
      setPlayerPosition(position + 1);
    }
  }, [playerStats, randomPlayerStats]);

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
