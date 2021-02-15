import { useContext, useEffect, useState } from 'react';
import { usePlayersProvider } from '../PlayersProvider';
import { PlayerStatsRecord } from '../../../uplift/types';
import { useFetchJson } from '../../../uplift/hooks/useFetchJson';
import { STATS_API_BASE_URL } from '../../../environment';

export type PlayerStatsJsonResult = {
  result: PlayerStatsRecord[];
};

export const usePlayerStatsAllTime = (): [
  boolean,
  PlayerStatsJsonResult | undefined
] => {
  const { allPlayers } = usePlayersProvider();
  const [loading, rawPlayerStats] = useFetchJson<PlayerStatsJsonResult>(
    `${STATS_API_BASE_URL}/players-by-points-ranking-all-time.json`
  );

  const [parsedStats, setParsedStats] = useState<
    PlayerStatsJsonResult | undefined
  >();

  useEffect(() => {
    if (allPlayers.length > 0 && !parsedStats && rawPlayerStats) {
      const parsedResult: PlayerStatsJsonResult = {
        result: rawPlayerStats.result.map(raw => ({
          ...raw,
          times_won: parseInt(raw.times_won.toString()),
          times_drawn: parseInt(raw.times_drawn.toString()),
          times_lost: parseInt(raw.times_lost.toString()),
        })),
      };

      const activePlayerNames = allPlayers
        .filter(p => !p.tags.includes('retired'))
        .map(p => p.name);

      const activePlayersStatsOnly: PlayerStatsJsonResult = {
        result: parsedResult.result.filter(r =>
          activePlayerNames.includes(r.player_name)
        ),
      };

      console.log('Active only players', activePlayersStatsOnly);

      setParsedStats(activePlayersStatsOnly);
    }
  }, [rawPlayerStats, parsedStats, allPlayers]);

  return [loading, parsedStats];
};
