// @flow

export type PlayerStats = {
  team: string,
  move: string,
  powerUp: string,
  player: string,
  winner: boolean,
}

export type GameStats = {
  date: string,
  player1: PlayerStats,
  player2: PlayerStats,
  theme: string,
  result: {
    draw: boolean,
    winner?: string,
  }
}
