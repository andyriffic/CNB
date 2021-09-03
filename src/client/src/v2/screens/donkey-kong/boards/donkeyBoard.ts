import { GameBoard, BOARD_CELL_TYPE } from '../types';

export type WormholeGroup = Array<number>;

export const generateBoard = (): GameBoard => {
  return {
    cells: [
      {
        number: 0,
        coordinates: [20, 730],
        type: BOARD_CELL_TYPE.SAFE,
        facingDirection: 'right',
      },
      {
        number: 1,
        coordinates: [120, 725],
        type: BOARD_CELL_TYPE.SAFE,
        facingDirection: 'right',
      },
      {
        number: 2,
        coordinates: [220, 720],
        type: BOARD_CELL_TYPE.SAFE,
        facingDirection: 'right',
      },
      {
        number: 3,
        coordinates: [320, 717],
        type: BOARD_CELL_TYPE.SAFE,
        facingDirection: 'right',
      },
      {
        number: 4,
        coordinates: [420, 715],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'right',
      },
      {
        number: 5,
        coordinates: [520, 710],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'right',
      },
      {
        number: 6,
        coordinates: [620, 708],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'right',
      },
      {
        number: 7,
        coordinates: [720, 706],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'right',
      },
      {
        number: 8,
        coordinates: [820, 704],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'right',
      },
      {
        number: 9,
        coordinates: [920, 702],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'right',
      },
      {
        number: 10,
        coordinates: [920, 615],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'left',
      },
      {
        number: 11,
        coordinates: [820, 613],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'left',
      },
      {
        number: 12,
        coordinates: [720, 611],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'left',
      },
      {
        number: 13,
        coordinates: [620, 609],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'left',
      },
      {
        number: 14,
        coordinates: [620, 480],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 15,
        coordinates: [535, 484],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 16,
        coordinates: [450, 488],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 17,
        coordinates: [365, 492],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 18,
        coordinates: [280, 500],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 19,
        coordinates: [280, 375],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 20,
        coordinates: [380, 375],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 21,
        coordinates: [480, 378],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 22,
        coordinates: [580, 380],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 23,
        coordinates: [680, 382],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 24,
        coordinates: [780, 384],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 25,
        coordinates: [780, 250],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 26,
        coordinates: [680, 253],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 27,
        coordinates: [580, 257],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 28,
        coordinates: [480, 261],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 29,
        coordinates: [380, 265],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 30,
        coordinates: [380, 135],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 31,
        coordinates: [480, 138],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 32,
        coordinates: [580, 141],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 33,
        coordinates: [680, 144],
        type: BOARD_CELL_TYPE.DANGER,
        facingDirection: 'right',
      },
      {
        number: 34,
        coordinates: [680, 50],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 35,
        coordinates: [600, 50],
        type: BOARD_CELL_TYPE.NORMAL,
        facingDirection: 'left',
      },
      {
        number: 36,
        coordinates: [520, 50],
        type: BOARD_CELL_TYPE.END,
        facingDirection: 'left',
      },
    ],
  };
};
