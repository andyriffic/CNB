import moment from 'moment';

import {
  getFlatPlayerHistory,
  getPlayerHistory,
} from '../uplift/datastore/gameHistory';
import { playersDatastore } from '../uplift/datastore/players';

export const query = `weeklySummary: WeeklySummary`;

export const schema = `
    type WeeklySummary {
      weekStarting: String!
      weekEnding: String!
      playerSummaries: [PlayerSummaryTotals]!
      mostWinsPlayerIds: [String]!
      mostDrawsPlayerIds: [String]!
      mostLossesPlayerIds: [String]!
    }

    type PlayerSummaryCount {
      playerId: String!
      total: Int!
    }

    type PlayerSummaryTotals {
      playerId: String!
      wins: Int!
      draws: Int!
      losses: Int!
    }
`;

type WeeklySummary = {
  weekStarting: string;
  weekEnding: string;
  mostWinsPlayerIds: string[];
  mostDrawsPlayerIds: string[];
  mostLossesPlayerIds: string[];
  playerSummaries: PlayerSummaryTotals[];
};

type PlayerSummaryTotals = {
  playerId: string;
  wins: number;
  draws: number;
  losses: number;
};

export const resolver = (): Promise<WeeklySummary> => {
  return new Promise<WeeklySummary>((res) => {
    playersDatastore.getAllPlayers().then((allPlayers) => {
      getPlayerHistory().then((gameHistory) => {
        const weekStarting = moment().startOf('isoWeek');
        const weekEnding = moment()
          .startOf('isoWeek')
          .add(1, 'week')
          .subtract(1, 'day');

        const filteredHistory = gameHistory.filter((gh) => {
          const gameDate = moment(gh.date);
          return gameDate.isBetween(weekStarting, weekEnding);
        });

        const flatGameHistory = getFlatPlayerHistory(
          filteredHistory,
          allPlayers
        );
        const allPlayerIds = flatGameHistory.map((fgh) => fgh.playerId);
        const uniquePlayerIds = new Set(allPlayerIds);

        let playerSummaries: PlayerSummaryTotals[] = [];

        uniquePlayerIds.forEach((playerId) => {
          const playerGames = flatGameHistory.filter(
            (fgh) => fgh.playerId === playerId
          );

          const totalWins = playerGames.reduce<number>(
            (acc, fgh) => (fgh.winner ? acc + 1 : acc),
            0
          );
          const totalDraws = playerGames.reduce<number>(
            (acc, fgh) => (fgh.draw ? acc + 1 : acc),
            0
          );
          const totalLosses = playerGames.reduce<number>(
            (acc, fgh) => (!fgh.draw && !fgh.winner ? acc + 1 : acc),
            0
          );

          playerSummaries.push({
            playerId,
            wins: totalWins,
            draws: totalDraws,
            losses: totalLosses,
          });
        });

        const topWinCount = playerSummaries.reduce<number>(
          (acc, ps) => (ps.wins > acc ? ps.wins : acc),
          0
        );

        const mostWinsPlayerIds = playerSummaries.reduce<string[]>(
          (acc, ps) => (ps.wins === topWinCount ? [...acc, ps.playerId] : acc),
          []
        );

        const topDrawCount = playerSummaries.reduce<number>(
          (acc, ps) => (ps.draws > acc ? ps.draws : acc),
          0
        );

        const mostDrawsPlayerIds = playerSummaries.reduce<string[]>(
          (acc, ps) =>
            ps.draws === topDrawCount ? [...acc, ps.playerId] : acc,
          []
        );

        const topLossesCount = playerSummaries.reduce<number>(
          (acc, ps) => (ps.losses > acc ? ps.losses : acc),
          0
        );

        const mostLossesPlayerIds = playerSummaries.reduce<string[]>(
          (acc, ps) =>
            ps.losses === topLossesCount ? [...acc, ps.playerId] : acc,
          []
        );

        res({
          weekStarting: weekStarting.format('dddd, MMMM Do YYYY'),
          weekEnding: weekEnding.format('dddd, MMMM Do YYYY'),
          mostWinsPlayerIds,
          mostDrawsPlayerIds,
          mostLossesPlayerIds,
          playerSummaries,
        });
      });
    });
  });
};
