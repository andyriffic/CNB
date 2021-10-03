import { StatsService } from '../uplift/services/stats';

export const query = `racingHistorySummary(gameId: String!): [String]
racingHistoryFile(gameId: String!, key: String!): [PlayerHistoryRecord]`;

export const schema = `
    type PlayerHistoryRecord {
        playerId: String!
        position: PlayerBoardPosition!
    }

    type PlayerBoardPosition {
      sectionIndex: Int!
      laneIndex: Int!
      squareIndex: Int!
  }

`;

export const resolver = {
  racingHistorySummary: (args: { gameId: string }) => {
    return StatsService.getRacingHistorySummary(args.gameId);
  },
  racingHistoryFile: (args: { gameId: string; key: string }) => {
    return StatsService.getRacingHistoryFile(args.gameId, args.key);
  },
};
