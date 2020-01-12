export type GameHistoryRecord = {
  date: Date;
  theme: string;
  player1: string;
  player2: string;
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
