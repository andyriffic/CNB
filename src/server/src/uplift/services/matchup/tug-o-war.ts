import { Game } from './types';
import { GameResult } from '../game-result/types';
import { PlayResult } from '../play/types';
import { counterService } from '../counter';
import { Counter } from '../counter/types';

export enum TugoWarAttributes {
  GameCount = 'gameCount',
  PlayerPositions = 'playerPositions',
}

export const getTugoWarStartingGameAttributes = (
  previousGame?: Game
): { [key: TugoWarAttributes]: any } => {
  if (!previousGame) {
    return {
      [TugoWarAttributes.GameCount]: 1,
      [TugoWarAttributes.PlayerPositions]: [2, 2],
    };
  }

  return {
    ...previousGame.gameAttributes,
    [TugoWarAttributes.GameCount]:
      previousGame.gameAttributes[TugoWarAttributes.GameCount] + 1,
  };
};

export const getTugoWarMoveGameAttributes = (
  game: Game,
  result: GameResult
): { [name: string]: any } => {
  if (result.draw) {
    return {
      ...game.gameAttributes,
      [TugoWarAttributes.PlayerPositions]: [2, 2],
    };
  }

  const playerPositions: [number, number] =
    game.gameAttributes[TugoWarAttributes.PlayerPositions];

  return {
    ...game.gameAttributes,
    [TugoWarAttributes.PlayerPositions]: playerPositions.map((p, index) =>
      index === result.winnerIndex ? 2 : p - 1
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
