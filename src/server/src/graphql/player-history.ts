import {
  GameHistoryRecord,
  getPlayerHistory,
} from '../uplift/datastore/gameHistory';
import { playersDatastore } from '../uplift/datastore/players';

export const query = `playerHistory(
    playerId: String!, 
    opponentId: String,
    matchupId: String
    ): PlayerMatchupHistory`;

export const schema = `
    type PlayerMatchupHistory {
      playerName: String!
      playerId: String!
      summary: PlayerMoveSummary!
      matchups: [PlayerMatchup]
    }

    type PlayerMatchup {
      theme: String!
      matchupId: String!
      moveId: String!
      draw: Boolean!
      opponentId: String!
      won: Boolean!
    }

    type PlayerMoveSummary {
      totalMoves: Int!
    }

    type PlayerGameResult {
      moveId: String!
    }
`;

type PlayerMoveSummary = {
  totalMoves: number;
  totalMoveA: number;
  totalMoveB: number;
  totalMoveC: number;
  totalTimesWon: number;
  totalTimesLost: number;
  totalTimesDrawn: number;
};

type PlayerMatchupHistory = {
  playerName: string;
  playerId: string;
  matchups: PlayerMatchup[];
  summary: PlayerMoveSummary;
};

type PlayerMatchup = {
  theme: string;
  matchupId: string;
  moveId: string;
  won: boolean;
  draw: boolean;
  // trophy?: boolean;
  opponentId: string;
};

export const resolver = (args: {
  playerId: string;
  opponentId?: string;
  matchupId?: string;
}): Promise<PlayerMatchupHistory> => {
  return new Promise<PlayerMatchupHistory>((res) => {
    playersDatastore.getAllPlayers().then((allPlayers) => {
      getPlayerHistory().then((gameHistory) => {
        const player = allPlayers.find((p) => p.id === args.playerId)!;

        const gameHistoryMatchupsFilter: (
          ghr: GameHistoryRecord
        ) => boolean = args.matchupId
          ? (pm) => pm.matchupId === args.matchupId
          : () => true;

        const playerGames = gameHistory.filter(
          (h) => h.player1 === player.name || h.player2 === player.name
        );

        const summary: PlayerMoveSummary = {
          totalMoves: playerGames.length,
          totalMoveA: 0,
          totalMoveB: 0,
          totalMoveC: 0,
          totalTimesWon: 0,
          totalTimesLost: 0,
          totalTimesDrawn: 0,
        };

        const opponentFilter: (
          playerMatchup: PlayerMatchup
        ) => boolean = args.opponentId
          ? (playerMatchup) => playerMatchup.opponentId === args.opponentId
          : () => true;

        const matchups = playerGames
          .filter(gameHistoryMatchupsFilter)
          .map((g) => {
            const moveId =
              (g.player1 === player.name && g.player1Move) ||
              (g.player2 === player.name && g.player2Move) ||
              '';

            const player1 = allPlayers.find((p) => p.name === g.player1);
            const player2 = allPlayers.find((p) => p.name === g.player2);

            const opponentId =
              (g.player1 === player.name && player2 && player2.id) ||
              (g.player2 === player.name && player1 && player1.id) ||
              '';

            const won =
              !g.draw &&
              ((g.player1 === player.name && g.winner === 'player1') ||
                (g.player2 === player.name && g.winner === 'player2'));

            return {
              matchupId: g.matchupId,
              theme: g.theme,
              moveId,
              draw: g.draw === 'true',
              opponentId,
              won,
            };
          })
          .filter(opponentFilter)
          .splice(0, 10);

        res({
          playerId: player.id,
          playerName: player.name,
          matchups,
          summary,
        });
      });
    });
  });
};
