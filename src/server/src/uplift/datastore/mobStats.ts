import axios from 'axios';
import { STATS_AWS_RESULT_BUCKET_NAME } from '../../environment';

type RawMainPlayerJson = {
  player_id: string;
  max_round_number: string;
  players_eliminated: string;
};

export type MainPlayerHistoryStats = {
  playerId: string;
  bestRounds: { roundNumber: number; playersEliminated: number }[];
};

export const getMainPlayerStats = (): Promise<MainPlayerHistoryStats[]> => {
  const url = `https://s3-ap-southeast-2.amazonaws.com/${STATS_AWS_RESULT_BUCKET_NAME}/mob-main-player-summary.json?timestamp=${new Date().getTime()}`;
  console.log('MOB STATS URL', url);

  return axios.get<RawMainPlayerJson[]>(url).then(({ data }) => {
    const allPlayerIds = data.map((raw) => raw.player_id);
    const uniquePlayerIds = Array.from(new Set(allPlayerIds));

    const mappedData: MainPlayerHistoryStats[] = uniquePlayerIds.map(
      (playerId) => ({
        playerId: playerId,
        bestRounds: data
          .filter((raw) => raw.player_id === playerId)
          .map((raw) => ({
            roundNumber: parseInt(raw.max_round_number),
            playersEliminated: parseInt(raw.players_eliminated),
          })),
      })
    );
    return mappedData;
  });
};
