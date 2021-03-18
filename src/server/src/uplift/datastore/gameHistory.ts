import axios from 'axios';
import { STATS_AWS_RESULT_BUCKET_NAME } from '../../environment';
import { Player } from '../services/player/types';

type GameHistoryResponse = {
  result: GameHistoryRecord[];
};

export type FlatGameHistory = {
  date: string;
  matchupId: string;
  theme: string;
  playerId: string;
  move: string;
  draw: boolean;
  winner: boolean;
};

export type GameHistoryRecord = {
  date: string;
  matchupId: string;
  theme: string;
  player1: string;
  player1Move: string;
  draw?: string;
  player2: string;
  player2Move: string;
  winner?: 'player1' | 'player2';
};

export const getPlayerHistory = (): Promise<GameHistoryRecord[]> => {
  return axios
    .get<GameHistoryResponse>(
      `https://s3-ap-southeast-2.amazonaws.com/cnb-stats-prod-results/game-result-history.json`
    )
    .then(({ data }) => {
      return data.result
        .filter((r) => !!r.matchupId)
        .map((r) => r as GameHistoryRecord);
    });
};

export const getFlatPlayerHistory = (
  gameHistory: GameHistoryRecord[],
  allPlayers: Player[]
): FlatGameHistory[] => {
  const flatHistory: FlatGameHistory[] = [];
  gameHistory.forEach((gh) => {
    flatHistory.push({
      date: gh.date,
      matchupId: gh.matchupId,
      theme: gh.theme,
      playerId: allPlayers.find((p) => p.name === gh.player1)!.id,
      move: gh.player1Move,
      draw: !!gh.draw,
      winner: gh.winner === 'player1',
    });
    flatHistory.push({
      date: gh.date,
      matchupId: gh.matchupId,
      theme: gh.theme,
      playerId: allPlayers.find((p) => p.name === gh.player2)!.id,
      move: gh.player2Move,
      draw: !!gh.draw,
      winner: gh.winner === 'player2',
    });
  });
  return flatHistory;
};
