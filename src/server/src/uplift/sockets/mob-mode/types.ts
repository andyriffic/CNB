import { Player } from '../../services/player/types';

export type MoveId = 'A' | 'B' | 'C';

export type MobBasePlayer = {
  player: Player;
  lastMoveId?: MoveId;
};

export type MugPlayer = MobBasePlayer & {
  lives: number;
};

export type MobPlayer = MobBasePlayer & {
  active: boolean;
};

export type MobGame = {
  id: string;
  mobPlayers: MobPlayer[];
  mugPlayer: MugPlayer;
};
