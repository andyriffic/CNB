import { Player } from '../../providers/PlayersProvider';

export type PacManBoard = {
  playerPath: PacManSquare[];
  pacManPath: PacManSquare[];
  gridCoordinates: {
    x: number[];
    y: number[];
  };
};

export type PacManSquare = {
  coordinates: Coordinates;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type PacManPlayer = {
  player: Player;
  status: '' | 'moving';
  pathIndex: number;
  movesRemaining: number;
  color: string;
  jailTurnsCount: number;
};

export type PacManCharacter = {
  status: '' | 'moving' | 'moved';
  pathIndex: number;
  movesRemaining: number;
};
