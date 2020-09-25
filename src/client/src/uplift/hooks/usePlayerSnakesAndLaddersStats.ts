import { useFetchJson } from './useFetchJson';
import { STATS_API_BASE_URL } from '../../environment';
import { useContext, useEffect, useState } from 'react';
import { PlayerStatsJsonResult } from './usePlayerStats2020';
import { PlayersContext } from '../contexts/PlayersProvider';

export const usePlayerSnakesAndLaddersStats = (): [
  boolean,
  PlayerStatsJsonResult | undefined
] => {
  const { allPlayers } = useContext(PlayersContext);
  const [loading, rawPlayerStats] = useFetchJson<PlayerStatsJsonResult>(
    `${STATS_API_BASE_URL}/snakes-and-ladders-leaderboard.json`
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
