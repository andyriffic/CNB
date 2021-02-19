import { Game } from './types';
import { GameResult } from '../game-result/types';
import { PlayResult } from '../play/types';
import { counterService } from '../counter';
import { Counter } from '../counter/types';

const GAMES_UNTIL_POWER_MODE_ACTIVATES = 4;

export enum TugoWarAttributes {
  GameCount = 'gameCount',
  PlayerPositions = 'playerPositions',
  PowerMode = 'powerMode',
}

export const getTugoWarStartingGameAttributes = (
  previousGame?: Game
): { [key: TugoWarAttributes]: any } => {
  if (!previousGame) {
    return {
      [TugoWarAttributes.GameCount]: 1,
      [TugoWarAttributes.PlayerPositions]: [2, 2],
      [TugoWarAttributes.PowerMode]: false,
    };
  }

  return {
    ...previousGame.gameAttributes,
    [TugoWarAttributes.GameCount]:
      previousGame.gameAttributes[TugoWarAttributes.GameCount] + 1,
    [TugoWarAttributes.PowerMode]:
      previousGame.gameAttributes[TugoWarAttributes.GameCount] >=
      GAMES_UNTIL_POWER_MODE_ACTIVATES
        ? true
        : false,
  };
};

export const getTugoWarMoveGameAttributes = (
  game: Game,
  result: GameResult
): { [name: string]: any } => {
  if (result.draw) {
    return {
      ...game.gameAttributes,
    };
  }

  const playerPositions: [number, number] =
    game.gameAttributes[TugoWarAttributes.PlayerPositions];

  const pullStrength = game.gameAttributes[TugoWarAttributes.PowerMode] ? 2 : 1;

  return {
    ...game.gameAttributes,
    [TugoWarAttributes.PlayerPositions]: playerPositions.map((p, index) =>
      index === result.winnerIndex ? 2 : Math.max(p - pullStrength, 0)
    ),
  };
};

export const adjustPlayResultForTugoWar = (
  playerPositions: [number, number],
  playResult: PlayResult
): PlayResult => {
  const someoneLost = playerPositions.find((p) => p === 0);

  if (someoneLost === undefined) {
    return playResult;
  }

  const winningPlayerIndex = playerPositions.findIndex((p) => p !== 0);

  //Give trophy to winning player
  const updatedTrophies: [Counter, Counter] = [
    { ...playResult.trophies[0] },
    { ...playResult.trophies[1] },
  ];
  updatedTrophies[winningPlayerIndex] = counterService.incrementCounter(
    updatedTrophies[winningPlayerIndex],
    1
  );

  return {
    ...playResult,
    trophies: updatedTrophies,
    trophyWon: true,
  };
};
