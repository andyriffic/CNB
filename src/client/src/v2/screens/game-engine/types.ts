import { Player } from '../../providers/PlayersProvider';

export type BoardCoordinates = { x: number; y: number };

export enum BOARD_CELL_TYPE {
  NORMAL = 0,
  LADDER = 1,
  FROZEN = 2,
  END = 3,
}

interface CellType {
  type: string;
}

export interface NormalCellType extends CellType {
  type: 'normal';
}

export interface LadderCellType extends CellType {
  type: 'ladder';
  destinationCellNumber: number;
}

export interface FrozenCellType extends CellType {
  type: 'frozen';
  numberOfTurns: number;
}

export interface EndCellType extends CellType {
  type: 'end';
}

export type GameBoardCell = {
  number: number;
  coordinates: BoardCoordinates;
  behaviour: NormalCellType | LadderCellType | FrozenCellType | EndCellType;
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
