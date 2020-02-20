import { useFetchJson } from './useFetchJson';
import { STATS_API_BASE_URL } from '../../environment';
import { useEffect, useState } from 'react';
import { PlayerStatsJsonResult } from './usePlayerStats';

export const usePlayerSnakesAndLaddersStats = (): [
  boolean,
  PlayerStatsJsonResult | undefined
] => {
  const [loading, rawPlayerStats] = useFetchJson<PlayerStatsJsonResult>(
    `${STATS_API_BASE_URL}/snakes-and-ladders-leaderboard.json`
  );

  const [parsedStats, setParsedStats] = useState<
    PlayerStatsJsonResult | undefined
  >();

  useEffect(() => {
    if (!parsedStats && rawPlayerStats) {
      const parsedResult: PlayerStatsJsonResult = {
        result: rawPlayerStats.result.map(raw => ({
          ...raw,
          times_won: parseInt(raw.times_won.toString()),
          times_drawn: parseInt(raw.times_drawn.toString()),
          times_lost: parseInt(raw.times_lost.toString()),
        })),
      };
      setParsedStats(parsedResult);
    }
  }, [rawPlayerStats, parsedStats]);

  return [loading, parsedStats];
};
