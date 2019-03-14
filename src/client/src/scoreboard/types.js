// @flow
export type PointsAssignment = {
  player1: number,
  player2: number,
  bonus: number,
};

export type Scores = {
  [string]: {
    value: number,
  },
  add: (number, Scores) => void, // TODO: return type is actually a function
  subtract: (number, Scores) => void, // TODO: return type is actually a function
};
