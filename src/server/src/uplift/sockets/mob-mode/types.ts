import { Player } from '../../services/player/types';

export type MoveId = 'A' | 'B' | 'C';
export type MobRoundState =
  | 'waiting-moves'
  | 'ready-to-play'
  | 'resolved-results'
  | 'viewed';
export type MoveResult = 'won' | 'lost' | 'draw';

export type MobBasePlayer = {
  playerId: string;
  lastMoveId?: MoveId;
};

export type MugPlayer = MobBasePlayer & {
  lives: number;
};

export type MobPlayer = MobBasePlayer & {
  active: boolean;
  lastMoveResult?: MoveResult;
  lastRound: number;
};

export type MobGameType = 'standard' | 'draw-ok-1-2' | 'draw-ok-1';

export type MobPlayerPoints = { playerId: string; points: number };

export type MobGamePoints = {
  mugPlayer: number;
  mobPlayers: MobPlayerPoints[];
};

export type MobGame = {
  id: string;
  round: number;
  gameType: MobGameType;
  roundState: MobRoundState;
  resolved: boolean;
  mobPlayers: MobPlayer[];
  mugPlayer: MugPlayer;
  points: MobGamePoints;
};

export type MobGameSpectatorView = {
  ready: boolean;
  gameOver: boolean;
} & MobGame;

export type MobPlayerSpectatorView = {
  moved: boolean;
} & MobPlayer;

export type MugPlayerSpectatorView = {
  moved: boolean;
} & MugPlayer;
