import React, { ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';

export type MainPlayerHistoryStats = {
  playerId: string;
  bestRounds: { roundNumber: number; playersEliminated: number }[];
};

export type TopMainPlayerRound = {
  playersEliminated: number;
  playerIds: string[];
};

export type RoundResult = {
  roundNumber: 1 | 2 | 3;
  playersEliminated: number;
};

export type TopMainPlayerStats = {
  mobMainBestPlayers: {
    round1: TopMainPlayerRound;
    round2: TopMainPlayerRound;
    round3: TopMainPlayerRound;
  };
  mobMainPlayerSummary: {
    playerId: string;
    bestRounds: RoundResult[];
  }[];
};

type MobLeaderboardService = {
  topMainPlayerStats?: TopMainPlayerStats;
  refresh: () => void;
};

const TOP_PLAYERS_QUERY = gql`
  query GetBestMainPlayers {
    mobMainBestPlayers {
      round1 {
        playersEliminated
        playerIds
      }
      round2 {
        playersEliminated
        playerIds
      }
      round3 {
        playersEliminated
        playerIds
      }
    }
    mobMainPlayerSummary {
      playerId
      bestRounds {
        roundNumber
        playersEliminated
      }
    }
  }
`;

export const MobLeaderboardContext = React.createContext<
  MobLeaderboardService | undefined
>(undefined);

export const MobLeaderboardProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, refetch } = useQuery<TopMainPlayerStats>(TOP_PLAYERS_QUERY);

  return (
    <MobLeaderboardContext.Provider
      value={{ topMainPlayerStats: data, refresh: refetch }}
    >
      {children}
    </MobLeaderboardContext.Provider>
  );
};

export function useMobLeaderboard() {
  const context = React.useContext(MobLeaderboardContext);
  if (context === undefined) {
    throw new Error(
      'useMobLeaderboard must be used within a MobLeaderboardProvider'
    );
  }
  return context;
}
