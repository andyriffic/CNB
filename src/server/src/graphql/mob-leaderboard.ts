import {
  MainPlayerHistoryStats,
  getMainPlayerStats,
} from '../uplift/datastore/mobStats';

export const query = `mobMainPlayerSummary: [MainPlayerStats]
mobMainBestPlayers: BestMainPlayers`;

export const schema = `
    type MainPlayerStats {
        playerId: String!
        bestRounds: [BestRound]!
    }

    type BestRound {
      roundNumber: Int!
      playersEliminated: Int!
    }

    type TopMainPlayerRound {
      playersEliminated: Int!
      playerIds: [String]!
    }

    type BestMainPlayers {
      round1: TopMainPlayerRound
      round2: TopMainPlayerRound
      round3: TopMainPlayerRound
    }
`;

export const resolver = {
  mobMainPlayerSummary: getMainPlayerStats,
  mobMainBestPlayers: () =>
    getMainPlayerStats().then((data) => {
      return {
        round1: getMostPlayersEliminated(1, data),
        round2: getMostPlayersEliminated(2, data),
        round3: getMostPlayersEliminated(3, data),
      };
    }),
};

type TopMainPlayerRound = {
  playersEliminated: number;
  playerIds: string[];
};

function getMostPlayersEliminated(
  round: 1 | 2 | 3,
  stats: MainPlayerHistoryStats[]
): TopMainPlayerRound {
  const allRoundPlayers = stats
    .filter((stat) => stat.bestRounds.find((br) => br.roundNumber === round))
    .map((stat) => ({
      ...stat,
      bestRounds: stat.bestRounds.filter((br) => br.roundNumber === round),
    }));

  const maxPlayersEliminated = allRoundPlayers.reduce((max, stat) => {
    const playersEliminated = stat.bestRounds[0].playersEliminated;
    return playersEliminated > max ? playersEliminated : max;
  }, 0);

  const bestPlayersInRound = allRoundPlayers.filter(
    (stat) => stat.bestRounds[0].playersEliminated === maxPlayersEliminated
  );

  return {
    playersEliminated: maxPlayersEliminated,
    playerIds: bestPlayersInRound.map((ps) => ps.playerId),
  };
}
