import { PlayerStatsRecordWithRanking } from '../types';
import { useState, useEffect } from 'react';
import { selectRandomOneOf } from '../utils/random';
import {
  rankPlayers,
  groupRankings,
} from '../screens/player-profile-stats/ranking';
import { usePlayerStats, PlayerStatsJsonResult } from './usePlayerStats';

export const useGroupedStatsWithRanking = (
  stats: () => [boolean, PlayerStatsJsonResult | undefined]
): [PlayerStatsRecordWithRanking[][] | undefined] => {
  const [loadingStats, playerStats] = stats();

  const [groupedStatsWithRanking, setGroupedStatsWithRanking] = useState<
    PlayerStatsRecordWithRanking[][] | undefined
  >();

  useEffect(() => {
    if (playerStats && !groupedStatsWithRanking) {
      const rankedPlayers = rankPlayers(playerStats.result);
      const groupedRankedPlayers = groupRankings(rankedPlayers);
      setGroupedStatsWithRanking(groupedRankedPlayers);
      console.log('----GROUPED RANKINGS----', groupedRankedPlayers);
    }
  }, [playerStats, groupedStatsWithRanking]);

  return [groupedStatsWithRanking];
};
