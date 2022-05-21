export type MatchTournament = {
  games: MatchupGame[];
  currentGameIndex: number;
  extraPlayer?: MatchupExtraPlayer;
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
