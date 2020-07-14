import { GameBoard, BOARD_CELL_TYPE } from '../../types';

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
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 21,
      },
      {
        number: 18,
        coordinates: [220, 290],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 5,
        fairy: true,
      },
      {
        number: 19,
        coordinates: [140, 250],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 20,
        coordinates: [190, 195],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 21,
        coordinates: [280, 195],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 22,
        coordinates: [370, 195],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 3,
      },
      {
        number: 23,
        coordinates: [455, 195],
        type: BOARD_CELL_TYPE.LADDER,
        linkedCellIndex: 29,
      },
      {
        number: 24,
        coordinates: [535, 195],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 25,
        coordinates: [620, 195],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 26,
        coordinates: [685, 140],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 12,
      },
      {
        number: 27,
        coordinates: [615, 95],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 14,
        fairy: true,
      },
      {
        number: 28,
        coordinates: [530, 95],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 29,
        coordinates: [440, 95],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 30,
        coordinates: [355, 95],
        type: BOARD_CELL_TYPE.NORMAL,
      },
      {
        number: 31,
        coordinates: [270, 95],
        type: BOARD_CELL_TYPE.SNAKE,
        linkedCellIndex: 19,
      },
      {
        number: 32,
        coordinates: [200, 95],
        type: BOARD_CELL_TYPE.END,
      },
    ],
  };
};
