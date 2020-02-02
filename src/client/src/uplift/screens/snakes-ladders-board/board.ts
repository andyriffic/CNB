import { isFeatureEnabled } from '../../../featureToggle';

export const gameBoardDebug = isFeatureEnabled('debug');

export type BoardCoordinates = [number, number];

export enum BOARD_CELL_TYPE {
  NORMAL = 0,
  SNAKE = 1,
  LADDER = 2,
}

export type GameBoardCell = {
  number: number;
  coordinates: BoardCoordinates;
  type: BOARD_CELL_TYPE;
  linkedCellIndex?: number;
};

export type GameBoard = {
  cells: GameBoardCell[];
};

export const generateBoard = (): GameBoard => {
  return {
    cells: [
      {
        number: 0,
        coordinates: [715, 480],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 1,
        coordinates: [595, 480],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 12,
      },
      {
        number: 2,
        coordinates: [505, 480],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 3,
        coordinates: [415, 480],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 4,
        coordinates: [325, 480],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 16,
      },
      {
        number: 5,
        coordinates: [245, 480],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 6,
        coordinates: [155, 460],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 7,
        coordinates: [155, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 8,
        coordinates: [235, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 9,
        coordinates: [325, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 10,
        coordinates: [425, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 11,
        coordinates: [525, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 12,
        coordinates: [620, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 13,
        coordinates: [670, 310],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 14,
        coordinates: [580, 290],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 15,
        coordinates: [490, 290],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 16,
        coordinates: [400, 290],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 17,
        coordinates: [300, 290],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 18,
        coordinates: [220, 290],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 5,
      },
    ],
  };
};
