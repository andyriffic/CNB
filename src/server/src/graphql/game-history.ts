import {
  GameHistoryRecord,
  getPlayerHistory,
} from '../uplift/datastore/gameHistory';

export const schema = `
    type GameHistoryRecord {
        matchupId: String!
    }
`;

export const resolver = (): Promise<GameHistoryRecord[]> => {
  return getPlayerHistory();
};
