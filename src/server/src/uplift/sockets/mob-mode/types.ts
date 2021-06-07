import { Player } from '../../services/player/types';

export type MoveId = 'A' | 'B' | 'C';
export type MobRoundState =
  | 'waiting-moves'
  | 'ready-to-play'
  | 'resolved-results'
  | 'viewed';
export type MoveResult = 'won' | 'lost' | 'draw';

export type MobBasePlayer = {
  player: Player;
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

export type MobGame = {
  id: string;
  round: number;
  roundState: MobRoundState;
  resolved: boolean;
  mobPlayers: MobPlayer[];
  mugPlayer: MugPlayer;
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
