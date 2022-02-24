import { Player } from '../../providers/PlayersProvider';

export type PacManBoard = {
  squares: PacManSquare[];
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
  squareIndex: number;
  movesRemaining: number;
  color: string;
};
