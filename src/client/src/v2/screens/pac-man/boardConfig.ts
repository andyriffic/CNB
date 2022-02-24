import { PacManBoard } from './types';

export const generateTestBoard = (): PacManBoard => {
  let board: PacManBoard = boardConfig;

  board.squares = [];

  for (let x = 0; x < board.gridCoordinates.x.length; x++) {
    for (let y = 0; y < board.gridCoordinates.y.length; y++) {
      board.squares.push({ coordinates: { x, y } });
    }
  }

  return board;
};

export const boardConfig: PacManBoard = {
  squares: [
    { coordinates: { x: 0, y: 6 } },
    { coordinates: { x: 1, y: 6 } },
    { coordinates: { x: 2, y: 6 } },
    { coordinates: { x: 3, y: 6 } },
    { coordinates: { x: 3, y: 7 } },
    { coordinates: { x: 3, y: 8 } },
    { coordinates: { x: 2, y: 8 } },
    { coordinates: { x: 1, y: 8 } },
    { coordinates: { x: 0, y: 8 } },
    { coordinates: { x: 0, y: 9 } },
    { coordinates: { x: 0, y: 10 } },
    { coordinates: { x: 1, y: 10 } },
    { coordinates: { x: 1, y: 11 } },
    { coordinates: { x: 0, y: 11 } },
    { coordinates: { x: 0, y: 12 } },
    { coordinates: { x: 0, y: 13 } },
    { coordinates: { x: 1, y: 13 } },
    { coordinates: { x: 2, y: 13 } },
    { coordinates: { x: 3, y: 13 } },
    { coordinates: { x: 4, y: 13 } },
    { coordinates: { x: 5, y: 13 } },
    { coordinates: { x: 6, y: 13 } },
    { coordinates: { x: 7, y: 13 } },
    { coordinates: { x: 7, y: 12 } },
    { coordinates: { x: 7, y: 11 } },
  ],
  gridCoordinates: {
    x: [5, 10, 16, 22, 27, 32, 37, 42, 47, 53, 58, 63, 69, 74, 79, 84, 91],
    y: [4, 10, 16, 22, 27, 35, 44, 55, 63, 68, 73, 82, 87, 92],
  },
};
