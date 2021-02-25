import axios from 'axios';
import { gameHistoryQuery } from '../stats/game-history-query';
import { getPlayerHistory } from '../uplift/datastore/gameHistory';

export const query = 'playerHistory(playerId: String!): PlayerMatchupHistory';

export const schema = `
    type PlayerMatchupHistory {
      playerName: String!
      playerId: String!
      matchups: [PlayerMatchup]
    }

    type PlayerMatchup {
      theme: String!
      matchupId: String!
      moveId: String!
      draw: Boolean!
      opponent: String!
    }

    type PlayerGameResult {
      moveId: String!
    }
`;

type PlayerMatchupHistory = {
  playerName: string;
  playerId: string;
  matchups: PlayerMatchup[];
};

type PlayerMatchup = {
  theme: string;
  matchupId: string;
  moveId: string;
  // won: boolean;
  draw: boolean;
  // trophy?: boolean;
  opponent: string;
};

export const resolver = (args: {
  playerId: string;
}): Promise<PlayerMatchupHistory> => {
  console.log('player history: ', args);

  return new Promise<PlayerMatchupHistory>((res) => {
    getPlayerHistory().then((gameHistory) => {
      const playerGames = gameHistory.filter(
        (h) => h.player1 === args.playerId || h.player2 === args.playerId
      );
      res({
        playerId: args.playerId,
        playerName: args.playerId,
        matchups: playerGames.map((g) => ({
          matchupId: g.matchupId,
          theme: g.theme,
          moveId:
            (g.player1 === args.playerId && g.player1Move) ||
            (g.player2 === args.playerId && g.player2Move) ||
            '',
          draw: g.draw === 'true',
          opponent:
            (g.player1 === args.playerId && g.player2) ||
            (g.player2 === args.playerId && g.player1) ||
            '',
        })),
      });
    });
  });
};
