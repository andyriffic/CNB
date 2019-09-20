export type GameHistoryRecord = {
  date: Date;
  theme: string;
  player1: string;
  player2: string;
};

export type GameHistory = {
  result: GameHistoryRecord[];
};
