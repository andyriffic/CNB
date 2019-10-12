// Types taken from existing flow type here...
// Kept format the same so don't have to change the reporting Athena queries, but can re-visit the format later
export type PlayerStatsEntry = {
  team: string;
  move: string;
  powerUp: string;
  player: string;
  winner: boolean;
  trophy: boolean;
};

export type GameStatsEntry = {
  date: string;
  matchupId: string;
  player1: PlayerStatsEntry;
  player2: PlayerStatsEntry;
  theme: string;
  mode: string;
  result: {
    draw: boolean;
    winner?: 'player1' | 'player2';
  };
};
