import { Player } from '../../services/player/types';

export type MoveId = 'A' | 'B' | 'C';
export type MobGameState = 'in-progress' | 'ready' | 'resolved';
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
