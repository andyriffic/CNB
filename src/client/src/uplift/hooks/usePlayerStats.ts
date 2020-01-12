import { useFetchJson } from './useFetchJson';
import { STATS_API_BASE_URL } from '../../environment';
import { PlayerStatsRecord } from '../types';

type PlayerStatsJsonResult = {
  result: PlayerStatsRecord[];
};

export const usePlayerStats = () => {
  return useFetchJson<PlayerStatsJsonResult>(
    `${STATS_API_BASE_URL}/players-by-points-ranking.json`
  );
};
