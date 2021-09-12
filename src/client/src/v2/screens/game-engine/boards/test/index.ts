import { BOARD_CELL_TYPE, GameBoard } from '../../types';
import background from './040990.jpg';

export const board: GameBoard = {
  cells: [
    { number: 0, type: BOARD_CELL_TYPE.NORMAL, coordinates: { x: 50, y: 50 } },
    {
      number: 1,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 111, y: 50 },
    },
    {
      number: 2,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 172, y: 50 },
    },
    {
      number: 3,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 233, y: 50 },
    },
    {
      number: 4,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 294, y: 50 },
    },
    {
      number: 5,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 355, y: 50 },
    },
    {
      number: 6,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 416, y: 50 },
    },
    {
      number: 7,
      type: BOARD_CELL_TYPE.END,
      coordinates: { x: 477, y: 50 },
    },
  ],
  boardBackgroundImage: background,
  widthPx: 500,
  heightPx: 500,
};
