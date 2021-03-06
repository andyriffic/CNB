import { useFetchJson } from './useFetchJson';
import { STATS_API_BASE_URL } from '../../environment';
import { GameHistoryRecord } from '../types';
import { useState, useEffect } from 'react';

type GameHistoryJsonResult = {
  result: GameHistoryRecord[];
};

type GroupedGameHistoryResult = {
  matchupId: string;
  gameMode: string;
  date: Date;
  player1: string;
  player2: string;
  games: GameHistoryRecord[];
};

const onlyGamesWithMatchupIds = (historyRecord: GameHistoryRecord) =>
  !!historyRecord.matchupId;

const groupByMatchupId = (gameHistory: GameHistoryRecord[]) => {
  const groupedGameHistory = gameHistory.reduce(
    (acc: GroupedGameHistoryResult[], gameHistoryRecord) => {
      const lastResult = acc[acc.length - 1];

      if (!lastResult || lastResult.matchupId !== gameHistoryRecord.matchupId) {
        const newGroup: GroupedGameHistoryResult = {
          matchupId: gameHistoryRecord.matchupId,
          gameMode: gameHistoryRecord.gameMode,
          date: gameHistoryRecord.date,
          player1: gameHistoryRecord.player1,
          player2: gameHistoryRecord.player2,
          games: [gameHistoryRecord],
        };
        return [...acc, newGroup];
      }

      lastResult.games.push(gameHistoryRecord); //TODO: don't mutate
      return acc;
    },
    []
  );

  return groupedGameHistory;
};

export const useGameHistory = (
  gameLimit?: number
): [GroupedGameHistoryResult[] | undefined] => {
  const [groupedGameHistory, setGroupedGameHistory] = useState<
    GroupedGameHistoryResult[] | undefined
  >();
  const [loading, rawGameHistory] = useFetchJson<GameHistoryJsonResult>(
    `${STATS_API_BASE_URL}/game-result-history.json`
  );

  useEffect(() => {
    if (rawGameHistory && !groupedGameHistory) {
      const filteredRecords = rawGameHistory.result.filter(
        onlyGamesWithMatchupIds
      );
      setGroupedGameHistory(
        groupByMatchupId(filteredRecords).slice(
          0,
          gameLimit || filteredRecords.length + 1
        )
      );
    }
  }, [rawGameHistory]);

  return [groupedGameHistory];
};
