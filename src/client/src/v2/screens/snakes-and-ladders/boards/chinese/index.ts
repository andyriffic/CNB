import { GameBoard, BOARD_CELL_TYPE } from '../../types';

export const generateBoard = (): GameBoard => {
  return {
    cells: [
      {
        number: 0,
        coordinates: [180, 530],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 1,
        coordinates: [340, 550],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 2,
        coordinates: [400, 550],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 3,
        coordinates: [460, 545],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 4,
        coordinates: [515, 510],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 5,
        coordinates: [545, 460],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 6,
        coordinates: [550, 400],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 7,
        coordinates: [530, 345],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 5,
      },
      {
        number: 8,
        coordinates: [485, 300],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 9,
        coordinates: [430, 275],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 10,
        coordinates: [365, 275],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 11,
        coordinates: [305, 280],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 12,
        coordinates: [240, 300],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 13,
        coordinates: [185, 320],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 14,
        coordinates: [125, 300],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 20,
      },
      {
        number: 15,
        coordinates: [90, 250],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 16,
        coordinates: [90, 185],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 17,
        coordinates: [120, 130],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 18,
        coordinates: [170, 105],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 19,
        coordinates: [235, 90],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 17,
      },
      {
        number: 20,
        coordinates: [295, 85],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 21,
        coordinates: [355, 90],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 22,
        coordinates: [420, 100],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 26,
      },
      {
        number: 23,
        coordinates: [475, 120],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 24,
        coordinates: [530, 150],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 25,
        coordinates: [580, 185],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 26,
        coordinates: [610, 240],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 27,
        coordinates: [630, 300],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 28,
        coordinates: [625, 365],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 29,
        coordinates: [620, 430],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 30,
        coordinates: [615, 490],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 31,
        coordinates: [640, 550],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 32,
        coordinates: [685, 595],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 33,
        coordinates: [740, 620],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 31,
      },
      {
        number: 34,
        coordinates: [800, 635],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 35,
        coordinates: [865, 630],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 47,
      },
      {
        number: 36,
        coordinates: [925, 620],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 37,
        coordinates: [980, 585],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 38,
        coordinates: [1020, 540],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 39,
        coordinates: [1035, 480],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 40,
        coordinates: [1040, 420],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 42,
      },
      {
        number: 41,
        coordinates: [1020, 360],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 42,
        coordinates: [970, 320],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 43,
        coordinates: [910, 310],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 44,
        coordinates: [870, 355],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 45,
        coordinates: [880, 415],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 46,
        coordinates: [865, 470],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 47,
        coordinates: [805, 490],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 48,
        coordinates: [750, 470],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 49,
        coordinates: [720, 410],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 50,
        coordinates: [705, 355],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 45,
      },
      {
        number: 51,
        coordinates: [695, 295],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 52,
        coordinates: [700, 235],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 53,
        coordinates: [715, 170],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 54,
        coordinates: [750, 120],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 55,
        coordinates: [800, 85],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 56,
        coordinates: [860, 80],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 57,
        coordinates: [970, 110],
        type: BOARD_CELL_TYPE.END,
      },
    ],
  };
};
