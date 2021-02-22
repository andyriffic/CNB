import axios from 'axios';
import { gameHistoryQuery } from '../stats/game-history-query';

export const schema = `
    type GameHistoryRecord {
        matchupId: String!
    }
`;

type GameHistoryResponse = {
  result: GameHistoryRecord[];
};

type GameHistoryRecord = {
  matchupId: String;
};

export const resolver = (): Promise<GameHistoryRecord[]> => {
  return axios
    .get<GameHistoryResponse>(
      'https://s3-ap-southeast-2.amazonaws.com/cnb-stats-dev-results/game-result-history.json'
    )
    .then(({ data }) => {
      return data.result
        .filter((r) => !!r.matchupId)
        .map((r) => r as GameHistoryRecord);
    });
};
