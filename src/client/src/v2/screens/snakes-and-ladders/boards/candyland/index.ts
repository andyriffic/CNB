import { GameBoard, BOARD_CELL_TYPE } from '../../types';

export const generateBoard = (): GameBoard => {
  return {
    cells: [
      {
        number: 0,
        coordinates: [230, 630],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 1,
        coordinates: [150, 600],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 6,
      },
      {
        number: 2,
        coordinates: [95, 575],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 3,
        coordinates: [60, 525],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 4,
        coordinates: [60, 470],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 5,
        coordinates: [125, 440],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 11,
      },
      {
        number: 6,
        coordinates: [175, 420],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 7,
        coordinates: [170, 350],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 8,
        coordinates: [150, 290],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 9,
        coordinates: [125, 235],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 10,
        coordinates: [100, 180],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 11,
        coordinates: [125, 130],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 12,
        coordinates: [175, 100],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 13,
        coordinates: [230, 80],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 14,
        coordinates: [290, 90],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 15,
        coordinates: [340, 130],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 16,
        coordinates: [360, 180],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 17,
        coordinates: [355, 240],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 8,
      },
      {
        number: 18,
        coordinates: [370, 300],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 19,
        coordinates: [405, 350],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 20,
        coordinates: [460, 350],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 21,
        coordinates: [500, 300],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 22,
        coordinates: [540, 260],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 26,
      },
      {
        number: 23,
        coordinates: [580, 210],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 15,
      },
      {
        number: 24,
        coordinates: [630, 180],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 25,
        coordinates: [690, 190],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 26,
        coordinates: [750, 210],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 27,
        coordinates: [810, 210],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 35,
      },
      {
        number: 28,
        coordinates: [855, 180],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 29,
        coordinates: [910, 150],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 30,
        coordinates: [965, 160],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 31,
        coordinates: [1010, 200],
        type: BOARD_CELL_TYPE.NORMAL,
        // linkedCellIndex: 30,
        // fairy: true,
        // mustStop: true,
      },
      {
        number: 32,
        coordinates: [1040, 260],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 33,
        coordinates: [1025, 320],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 34,
        coordinates: [990, 360],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 35,
        coordinates: [930, 390],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 36,
        coordinates: [880, 420],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 37,
        coordinates: [830, 450],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 21,
      },
      {
        number: 38,
        coordinates: [775, 475],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 39,
        coordinates: [725, 510],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 40,
        coordinates: [675, 540],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 41,
        coordinates: [625, 570],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 42,
        coordinates: [575, 600],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 34,
      },
      {
        number: 43,
        coordinates: [520, 630],
        type: BOARD_CELL_TYPE.END,
      },
    ],
  };
};
