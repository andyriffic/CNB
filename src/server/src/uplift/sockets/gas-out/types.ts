import { Player } from '../../services/player/types';

export type Direction = 'left' | 'right';

export type GasGame = {
  id: string;
  allPlayers: GasPlayer[];
  alivePlayersIds: string[];
  deadPlayerIds: string[];
  direction: Direction;
  currentPlayer: {
    id: string;
    cardPlayed?: GasCard;
    pressesRemaining: number;
  };
  gasCloud: GasCloud;
};

type GasCloud = {
  pressed: number;
  exploded: boolean;
};

export type GasPlayer = {
  player: Player;
  status: 'alive' | 'dead';
  cards: GasCard[];
};

export type GasCard = {
  type: 'press' | 'skip' | 'reverse';
  presses: number;
};
