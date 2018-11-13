export type ServerMessages = {
  getGameStatus: () => void,
  makeMove: (string, string) => void,
};
