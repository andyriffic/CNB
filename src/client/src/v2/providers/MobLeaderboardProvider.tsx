import React, { ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

export type MainPlayerHistoryStats = {
  playerId: string;
  bestRounds: { roundNumber: number; playersEliminated: number }[];
};

export type TopMainPlayerRound = {
  playersEliminated: number;
  playerIds: string[];
};

type TopMainPlayerStats = {
  mobMainBestPlayers: {
    round1: TopMainPlayerRound;
    round2: TopMainPlayerRound;
    round3: TopMainPlayerRound;
  };
  mobMainPlayerSummary: {
    playerId: string;
    bestRounds: {
      roundNumber: 1 | 2 | 3;
      playersEliminated: number;
    }[];
  }[];
};

type MobLeaderboardService = {
  topMainPlayerStats?: TopMainPlayerStats;
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
  const { data } = useQuery<TopMainPlayerStats>(TOP_PLAYERS_QUERY);

  return (
    <MobLeaderboardContext.Provider value={{ topMainPlayerStats: data }}>
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
