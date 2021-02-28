import axios from 'axios';
import { STATS_AWS_RESULT_BUCKET_NAME } from '../../environment';

type GameHistoryResponse = {
  result: GameHistoryRecord[];
};

export type GameHistoryRecord = {
  matchupId: string;
  theme: string;
  player1: string;
  player1Move: string;
  draw?: string;
  player2: string;
  player2Move: string;
  winner?: 'player1' | 'player2';
};

export const getPlayerHistory = (): Promise<GameHistoryRecord[]> => {
  return axios
    .get<GameHistoryResponse>(
      `https://s3-ap-southeast-2.amazonaws.com/${STATS_AWS_RESULT_BUCKET_NAME}/game-result-history.json`
    )
    .then(({ data }) => {
      return data.result
        .filter((r) => !!r.matchupId)
        .map((r) => r as GameHistoryRecord);
    });
};
