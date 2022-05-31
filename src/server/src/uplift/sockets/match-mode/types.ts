export type MatchTournament = {
  rounds: MatchRound[];
  currentRound: number;
  extraPlayer?: MatchupExtraPlayer;
};

export type MatchRound = {
  currentGame: number;
  games: MatchupGame[];
};

export type MoveId = 'A' | 'B' | 'C';

export type MatchupGame = {
  players: [MatchupPlayer, MatchupPlayer];
  extraPlayerPick?: 0 | 1;
};

export type MatchupPlayer = {
  playerId: string;
  moveId?: MoveId;
  points: number;
};

export type MatchupExtraPlayer = {
  playerId: string;
};
