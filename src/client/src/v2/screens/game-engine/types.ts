import { Player } from '../../providers/PlayersProvider';

export type BoardCoordinates = { x: number; y: number };

export enum BOARD_CELL_TYPE {
  NORMAL = 0,
  SNAKE = 1,
  LADDER = 2,
  WORMHOLE = 3,
  END = 4,
}

export type GameBoardCell = {
  number: number;
  coordinates: BoardCoordinates;
  type: BOARD_CELL_TYPE;
  linkedCellIndex?: number | number[];
};

export type GamePlayer = {
  player: Player;
  cell: GameBoardCell;
  movesRemaining: number;
  isMoving: boolean;
};

export type GameBoard = {
  cells: GameBoardCell[];
  boardBackgroundImage: any;
  widthPx: number;
  heightPx: number;
};
