import { Player } from '../../providers/PlayersProvider';

export type PacManBoard = {
  playerPath: PacManSquare[];
  pacManPath: PacManSquare[];
  gridCoordinates: {
    x: number[];
    y: number[];
  };
  jailLocation: Coordinates;
};

export type PacManSquare = {
  coordinates: Coordinates;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type PacManPlayerStatus = '' | 'moving';

export type PacManPlayer = {
  player: Player;
  status: PacManPlayerStatus;
  pathIndex: number;
  movesRemaining: number;
  color: string;
  jailTurnsCount: number;
  offset: number;
};

export type PacManDirection = 'left' | 'right';

export type PacManCharacter = {
  status: '' | 'moving' | 'moved';
  pathIndex: number;
  movesRemaining: number;
  facingDirection: PacManDirection;
};
