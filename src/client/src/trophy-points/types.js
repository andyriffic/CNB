// @flow
export type TrophyPoints = {
  winner?: ?string,
  players: {
    [string]: number,
  },
  loaded: boolean,
  goal: number,
  setWinner: (TrophyPoints, ?string) => void,
};
