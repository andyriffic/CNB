export type ServerMessages = {
  spectatorJoin: () => void,
  makeMove: (string, string) => void,
};
