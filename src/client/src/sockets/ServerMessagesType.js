/* @flow */
export type ServerMessages = {
  getGameState: () => void,
  makeMove: (string, string) => void,
  resetGame: () => void,
  playGame: () => void,
};
