import { isFeatureEnabled } from '../../../featureToggle';

export type BoardCoordinates = [number, number];

export enum BOARD_CELL_TYPE {
  NORMAL = 0,
  SNAKE = 1,
  LADDER = 2,
  END = 3,
}

export type GameBoardCell = {
  number: number;
  coordinates: BoardCoordinates;
  type: BOARD_CELL_TYPE;
  linkedCellIndex?: number;
  fairy?: boolean;
  mustStop?: boolean;
};

export type GameBoard = {
  cells: GameBoardCell[];
};
