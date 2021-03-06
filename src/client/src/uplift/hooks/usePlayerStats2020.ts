import { useFetchJson } from './useFetchJson';
import { STATS_API_BASE_URL } from '../../environment';
import { PlayerStatsRecord } from '../types';
import { useContext, useEffect, useState } from 'react';
import { PlayersContext } from '../contexts/PlayersProvider';

export type PlayerStatsJsonResult = {
  result: PlayerStatsRecord[];
};

export const usePlayerStats2020 = (): [
  boolean,
  PlayerStatsJsonResult | undefined
] => {
  const { allPlayers } = useContext(PlayersContext);
  const [loading, rawPlayerStats] = useFetchJson<PlayerStatsJsonResult>(
    `${STATS_API_BASE_URL}/players-by-points-ranking-2020.json`
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

      setParsedStats(activePlayersStatsOnly);
    }
  }, [rawPlayerStats, parsedStats, allPlayers]);

  return [loading, parsedStats];
};
