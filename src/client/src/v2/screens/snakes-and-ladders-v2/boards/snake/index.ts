import { GameBoard, BOARD_CELL_TYPE } from '../../types';

export const generateBoard = (): GameBoard => {
  return {
    cells: [
      {
        number: 0,
        coordinates: [520, 640],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 1,
        coordinates: [400, 660],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 2,
        coordinates: [330, 680],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 3,
        coordinates: [245, 680],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 4,
        coordinates: [160, 640],
        type: BOARD_CELL_TYPE.WORMHOLE,
        linkedCellIndex: [8, 12, 15],
      },
      {
        number: 5,
        coordinates: [170, 560],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 6,
        coordinates: [250, 520],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 7,
        coordinates: [330, 510],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 8,
        coordinates: [410, 510],
        type: BOARD_CELL_TYPE.WORMHOLE,
      },
      {
        number: 9,
        coordinates: [490, 520],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 10,
        coordinates: [560, 540],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 24,
      },
      {
        number: 11,
        coordinates: [640, 550],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 12,
        coordinates: [710, 550],
        type: BOARD_CELL_TYPE.WORMHOLE,
      },
      {
        number: 13,
        coordinates: [790, 555],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 14,
        coordinates: [860, 555],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 15,
        coordinates: [940, 540],
        type: BOARD_CELL_TYPE.WORMHOLE,
      },
      {
        number: 16,
        coordinates: [1030, 520],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 17,
        coordinates: [1070, 450],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 18,
        coordinates: [1030, 380],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 19,
        coordinates: [970, 360],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 39,
      },
      {
        number: 20,
        coordinates: [890, 340],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 21,
        coordinates: [810, 335],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 13,
      },
      {
        number: 22,
        coordinates: [730, 330],
        type: BOARD_CELL_TYPE.WORMHOLE,
      },
      {
        number: 23,
        coordinates: [650, 330],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 24,
        coordinates: [580, 340],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 25,
        coordinates: [510, 340],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 26,
        coordinates: [440, 320],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 27,
        coordinates: [370, 280],
        type: BOARD_CELL_TYPE.WORMHOLE,
      },
      {
        number: 28,
        coordinates: [290, 290],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 29,
        coordinates: [235, 265],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 5,
      },
      {
        number: 30,
        coordinates: [310, 210],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 31,
        coordinates: [380, 205],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 49,
        // linkedCellIndex: 30,
        // fairy: true,
        // mustStop: true,
      },
      {
        number: 32,
        coordinates: [460, 200],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 33,
        coordinates: [530, 210],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 34,
        coordinates: [600, 220],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 35,
        coordinates: [670, 220],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 45,
      },
      {
        number: 36,
        coordinates: [750, 235],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 37,
        coordinates: [820, 240],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 38,
        coordinates: [890, 240],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 39,
        coordinates: [950, 220],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 40,
        coordinates: [990, 170],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 41,
        coordinates: [975, 105],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 11,
      },
      {
        number: 42,
        coordinates: [940, 60],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 43,
        coordinates: [840, 60],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 44,
        coordinates: [760, 60],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 45,
        coordinates: [680, 60],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 46,
        coordinates: [580, 70],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 47,
        coordinates: [490, 70],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 34,
      },
      {
        number: 48,
        coordinates: [410, 70],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 49,
        coordinates: [330, 70],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 50,
        coordinates: [250, 90],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 51,
        coordinates: [150, 90],
        type: BOARD_CELL_TYPE.END,
      },
    ],
  };
};
