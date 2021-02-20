export type GameHistoryRecord = {
  date: Date;
  theme: string;
  gameMode: string;
  matchupId: string;
  player1: string;
  player1Move: string;
  player2: string;
  player2Move: string;
  trophy?: string;
  winner?: string;
  draw?: string;
};

export type GameHistory = {
  result: GameHistoryRecord[];
};

export type PlayerStatsRecord = {
  player_name: string;
  times_played: number;
  times_won: number;
  times_drawn: number;
  times_lost: number;
};

export type PlayerStatsRecordWithRanking = {
  rank: number;
} & PlayerStatsRecord;
