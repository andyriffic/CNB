import { PacManBoard } from './types';

export const generateTestBoard = (): PacManBoard => {
  let board: PacManBoard = boardConfig;

  board.playerPath = [];

  for (let x = 0; x < board.gridCoordinates.x.length; x++) {
    for (let y = 0; y < board.gridCoordinates.y.length; y++) {
      board.playerPath.push({ coordinates: { x, y } });
    }
  }

  return board;
};

export const boardConfig: PacManBoard = {
  jailLocations: [{ x: 9, y: 6 }, { x: 8, y: 6 }, { x: 7, y: 6 }],
  playerPath: [
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
    { coordinates: { x: 6, y: 11 } },
    { coordinates: { x: 5, y: 11 } },
    { coordinates: { x: 5, y: 10 } },
    { coordinates: { x: 6, y: 10 } },
    { coordinates: { x: 7, y: 10 } },
    { coordinates: { x: 7, y: 9 } },
    { coordinates: { x: 7, y: 8 } },
    { coordinates: { x: 6, y: 8 } },
    { coordinates: { x: 5, y: 8 } },
    { coordinates: { x: 5, y: 7 } },
    { coordinates: { x: 5, y: 6 } },
    { coordinates: { x: 5, y: 5 } },
    { coordinates: { x: 6, y: 5 } },
    { coordinates: { x: 7, y: 5 } },
    { coordinates: { x: 7, y: 4 } },
    { coordinates: { x: 6, y: 4 } },
    { coordinates: { x: 5, y: 4 } },
    { coordinates: { x: 5, y: 3 } },
    { coordinates: { x: 5, y: 2 } },
    { coordinates: { x: 4, y: 2 } },
    { coordinates: { x: 3, y: 2 } },
    { coordinates: { x: 2, y: 2 } },
    { coordinates: { x: 1, y: 2 } },
    { coordinates: { x: 0, y: 2 } },
    { coordinates: { x: 0, y: 1 } },
    { coordinates: { x: 0, y: 0 } },
    { coordinates: { x: 1, y: 0 } },
    { coordinates: { x: 2, y: 0 } },
    { coordinates: { x: 3, y: 0 } },
    { coordinates: { x: 4, y: 0 } },
    { coordinates: { x: 5, y: 0 } },
    { coordinates: { x: 6, y: 0 } },
    { coordinates: { x: 7, y: 0 } },
    { coordinates: { x: 7, y: 1 } },
    { coordinates: { x: 7, y: 2 } },
    { coordinates: { x: 8, y: 2 } },
    { coordinates: { x: 9, y: 2 } },
    { coordinates: { x: 9, y: 1 } },
    { coordinates: { x: 9, y: 0 } },
    { coordinates: { x: 10, y: 0 } },
    { coordinates: { x: 11, y: 0 } },
    { coordinates: { x: 12, y: 0 } },
    { coordinates: { x: 13, y: 0 } },
    { coordinates: { x: 14, y: 0 } },
    { coordinates: { x: 15, y: 0 } },
    { coordinates: { x: 16, y: 0 } },
    { coordinates: { x: 16, y: 1 } },
    { coordinates: { x: 16, y: 2 } },
    { coordinates: { x: 16, y: 3 } },
    { coordinates: { x: 16, y: 4 } },
    { coordinates: { x: 15, y: 4 } },
    { coordinates: { x: 14, y: 4 } },
    { coordinates: { x: 13, y: 4 } },
    { coordinates: { x: 13, y: 3 } },
    { coordinates: { x: 13, y: 2 } },
    { coordinates: { x: 12, y: 2 } },
    { coordinates: { x: 11, y: 2 } },
    { coordinates: { x: 11, y: 3 } },
    { coordinates: { x: 11, y: 4 } },
    { coordinates: { x: 10, y: 4 } },
    { coordinates: { x: 9, y: 4 } },
    { coordinates: { x: 9, y: 5 } },
    { coordinates: { x: 10, y: 5 } },
    { coordinates: { x: 11, y: 5 } },
    { coordinates: { x: 11, y: 6 } },
    { coordinates: { x: 11, y: 7 } },
    { coordinates: { x: 11, y: 8 } },
    { coordinates: { x: 10, y: 8 } },
    { coordinates: { x: 9, y: 8 } },
    { coordinates: { x: 9, y: 9 } },
    { coordinates: { x: 9, y: 10 } },
    { coordinates: { x: 10, y: 10 } },
    { coordinates: { x: 11, y: 10 } },
    { coordinates: { x: 12, y: 10 } },
    { coordinates: { x: 13, y: 10 } },
    { coordinates: { x: 13, y: 11 } },
    { coordinates: { x: 14, y: 11 } },
    { coordinates: { x: 15, y: 11 } },
    { coordinates: { x: 15, y: 10 } },
    { coordinates: { x: 16, y: 10 } },
    { coordinates: { x: 16, y: 9 } },
    { coordinates: { x: 16, y: 8 } },
    { coordinates: { x: 15, y: 8 } },
    { coordinates: { x: 14, y: 8 } },
    { coordinates: { x: 13, y: 8 } },
    { coordinates: { x: 13, y: 7 } },
    { coordinates: { x: 13, y: 6 } },
    { coordinates: { x: 14, y: 6 } },
    { coordinates: { x: 15, y: 6 } },
    { coordinates: { x: 16, y: 6 } },
  ],
  pacManPath: [
    { coordinates: { x: 8, y: 5 } },
    { coordinates: { x: 7, y: 5 } },
    { coordinates: { x: 6, y: 5 } },
    { coordinates: { x: 5, y: 5 } },
    { coordinates: { x: 5, y: 6 } },
    { coordinates: { x: 5, y: 7 } },
    { coordinates: { x: 5, y: 8 } },
    { coordinates: { x: 4, y: 8 } },
    { coordinates: { x: 3, y: 8 } },
    { coordinates: { x: 3, y: 9 } },
    { coordinates: { x: 3, y: 10 } },
    { coordinates: { x: 3, y: 11 } },
    { coordinates: { x: 2, y: 11 } },
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
    { coordinates: { x: 8, y: 13 } },
    { coordinates: { x: 9, y: 13 } },
    { coordinates: { x: 9, y: 12 } },
    { coordinates: { x: 9, y: 11 } },
    { coordinates: { x: 10, y: 11 } },
    { coordinates: { x: 11, y: 11 } },
    { coordinates: { x: 11, y: 10 } },
    { coordinates: { x: 10, y: 10 } },
    { coordinates: { x: 9, y: 10 } },
    { coordinates: { x: 8, y: 10 } },
    { coordinates: { x: 7, y: 10 } },
    { coordinates: { x: 6, y: 10 } },
    { coordinates: { x: 5, y: 10 } },
    { coordinates: { x: 4, y: 10 } },
    { coordinates: { x: 3, y: 10 } },
    { coordinates: { x: 3, y: 9 } },
    { coordinates: { x: 3, y: 8 } },
    { coordinates: { x: 4, y: 8 } },
    { coordinates: { x: 5, y: 8 } },
    { coordinates: { x: 5, y: 7 } },
    { coordinates: { x: 5, y: 6 } },
    { coordinates: { x: 5, y: 5 } },
    { coordinates: { x: 6, y: 5 } },
    { coordinates: { x: 7, y: 5 } },
    { coordinates: { x: 7, y: 4 } },
    { coordinates: { x: 6, y: 4 } },
    { coordinates: { x: 5, y: 4 } },
    { coordinates: { x: 5, y: 3 } },
    { coordinates: { x: 5, y: 2 } },
    { coordinates: { x: 4, y: 2 } },
    { coordinates: { x: 3, y: 2 } },
    { coordinates: { x: 3, y: 1 } },
    { coordinates: { x: 3, y: 0 } },
    { coordinates: { x: 4, y: 0 } },
    { coordinates: { x: 5, y: 0 } },
    { coordinates: { x: 6, y: 0 } },
    { coordinates: { x: 7, y: 0 } },
    { coordinates: { x: 7, y: 1 } },
    { coordinates: { x: 7, y: 2 } },
    { coordinates: { x: 6, y: 2 } },
    { coordinates: { x: 5, y: 2 } },
    { coordinates: { x: 4, y: 2 } },
    { coordinates: { x: 3, y: 2 } },
    { coordinates: { x: 2, y: 2 } },
    { coordinates: { x: 1, y: 2 } },
    { coordinates: { x: 0, y: 2 } },
    { coordinates: { x: 0, y: 3 } },
    { coordinates: { x: 0, y: 4 } },
    { coordinates: { x: 1, y: 4 } },
    { coordinates: { x: 2, y: 4 } },
    { coordinates: { x: 3, y: 4 } },
    { coordinates: { x: 3, y: 3 } },
    { coordinates: { x: 3, y: 2 } },
    { coordinates: { x: 3, y: 1 } },
    { coordinates: { x: 3, y: 0 } },
  ],
  gridCoordinates: {
    x: [5, 10, 16, 22, 27, 32, 37, 42, 47, 53, 58, 63, 69, 74, 79, 84, 91],
    y: [4, 10, 16, 22, 27, 35, 44, 55, 63, 68, 73, 82, 87, 92],
  },
};
