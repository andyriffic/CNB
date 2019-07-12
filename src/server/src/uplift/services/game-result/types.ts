export enum GAME_MOVE {
  A = 'A',
  B = 'B',
  C = 'C',
}

export type GameResultInput = [GAME_MOVE, GAME_MOVE];

export type GameResult = {
  draw?: boolean;
  winnerIndex?: number;
};
