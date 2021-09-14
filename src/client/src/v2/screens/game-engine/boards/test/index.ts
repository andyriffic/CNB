import { BOARD_CELL_TYPE, GameBoard } from '../../types';
import background from './world.jpg';

export const board: GameBoard = {
  cells: [
    {
      number: 0,
      behaviour: { type: 'normal' },
      coordinates: { x: 70, y: 100 },
    },
    {
      number: 1,
      behaviour: { type: 'normal' },
      coordinates: { x: 106, y: 122 },
    },
    {
      number: 2,
      behaviour: { type: 'ladder', destinationCellNumber: 8 },
      coordinates: { x: 118, y: 143 },
    },
    {
      number: 3,
      behaviour: { type: 'normal' },
      coordinates: { x: 122, y: 173 },
    },
    {
      number: 4,
      behaviour: { type: 'normal' },
      coordinates: { x: 118, y: 204 },
    },
    {
      number: 5,
      behaviour: { type: 'normal' },
      coordinates: { x: 113, y: 230 },
    },
    {
      number: 6,
      behaviour: { type: 'normal' },
      coordinates: { x: 104, y: 260 },
    },
    {
      number: 7,
      behaviour: { type: 'normal' },
      coordinates: { x: 97, y: 286 },
    },
    {
      number: 8,
      behaviour: { type: 'normal' },
      coordinates: { x: 90, y: 312 },
    },
    {
      number: 9,
      behaviour: { type: 'normal' },
      coordinates: { x: 82, y: 340 },
    },
    {
      number: 10,
      behaviour: { type: 'normal' },
      coordinates: { x: 73, y: 369 },
    },
    {
      number: 11,
      behaviour: { type: 'normal' },
      coordinates: { x: 68, y: 397 },
    },
    {
      number: 12,
      behaviour: { type: 'normal' },
      coordinates: { x: 66, y: 423 },
    },
    {
      number: 13,
      behaviour: { type: 'end' },
      coordinates: { x: 70, y: 453 },
    },
  ],
  boardBackgroundImage: background,
  widthPx: 1000,
  heightPx: 700,
};
