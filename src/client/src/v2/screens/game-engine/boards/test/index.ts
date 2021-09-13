import { BOARD_CELL_TYPE, GameBoard } from '../../types';
import background from './world.jpg';

export const board: GameBoard = {
  cells: [
    { number: 0, type: BOARD_CELL_TYPE.NORMAL, coordinates: { x: 70, y: 100 } },
    {
      number: 1,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 106, y: 122 },
    },
    {
      number: 2,
      type: BOARD_CELL_TYPE.LADDER,
      coordinates: { x: 118, y: 143 },
      linkedCellIndex: 6,
    },
    {
      number: 3,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 122, y: 173 },
    },
    {
      number: 4,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 118, y: 204 },
    },
    {
      number: 5,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 113, y: 230 },
    },
    {
      number: 6,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 104, y: 260 },
    },
    {
      number: 7,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 97, y: 286 },
    },
    {
      number: 8,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 90, y: 312 },
    },
    {
      number: 9,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 82, y: 340 },
    },
    {
      number: 10,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 73, y: 369 },
    },
    {
      number: 11,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 68, y: 397 },
    },
    {
      number: 12,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 66, y: 423 },
    },
    {
      number: 13,
      type: BOARD_CELL_TYPE.NORMAL,
      coordinates: { x: 70, y: 453 },
    },
  ],
  boardBackgroundImage: background,
  widthPx: 1000,
  heightPx: 700,
};
