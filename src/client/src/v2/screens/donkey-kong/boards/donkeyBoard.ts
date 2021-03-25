import { GameBoard, BOARD_CELL_TYPE } from '../types';

export type WormholeGroup = Array<number>;

export const generateBoard = (): GameBoard => {
  return {
    cells: [
      {
        number: 0,
        coordinates: [20, 730],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 1,
        coordinates: [120, 725],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 2,
        coordinates: [220, 720],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 3,
        coordinates: [320, 717],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 4,
        coordinates: [420, 715],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 5,
        coordinates: [520, 710],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 6,
        coordinates: [620, 708],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 7,
        coordinates: [720, 706],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 8,
        coordinates: [820, 704],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 9,
        coordinates: [920, 702],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 10,
        coordinates: [920, 615],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 11,
        coordinates: [820, 613],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 12,
        coordinates: [720, 611],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 13,
        coordinates: [620, 609],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 14,
        coordinates: [620, 480],
        type: BOARD_CELL_TYPE.NORMAL,
      },
    ],
  };
};
