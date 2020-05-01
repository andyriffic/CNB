import {
  selectRandomOneOf,
  selectWeightedRandomOneOf,
} from '../../utils/random';
import { Game } from './types';
import { GameResult } from '../game-result/types';
import { PlayResult } from '../play/types';
import { counterService } from '../counter';
import { Counter } from '../counter/types';

export enum TimebombAttributes {
  GameCount = 'gameCount',
  PlayerIndexHoldingTimebomb = 'playerIndexHoldingTimebomb',
  Exploded = 'exploded',
}

export const getStartingGameAttributes = (
  previousGame?: Game
): { [key: TimebombAttributes]: any } => {
  if (!previousGame) {
    return {
      [TimebombAttributes.GameCount]: 1,
      [TimebombAttributes.PlayerIndexHoldingTimebomb]: selectRandomOneOf([
        0,
        1,
      ]),
      [TimebombAttributes.Exploded]: false,
    };
  }

  if (previousGame.gameAttributes.exploded) {
    return {
      ...previousGame.gameAttributes,
      [TimebombAttributes.GameCount]: 1,
      [TimebombAttributes.Exploded]: false,
    };
  }

  return {
    ...previousGame.gameAttributes,
    [TimebombAttributes.GameCount]:
      previousGame.gameAttributes[TimebombAttributes.GameCount] + 1,
  };
};

const didExplode = (gameCount: number) => {
  const weightedList = [
    { item: true, weight: gameCount },
    { item: false, weight: 4 },
  ];

  console.log('Timebomb weightings', weightedList);

  return selectWeightedRandomOneOf<boolean>(weightedList);
};

export const getTimebombMoveGameAttributes = (
  game: Game,
  result: GameResult
): { [name: string]: any } => {
  return {
    ...game.gameAttributes,
    [TimebombAttributes.PlayerIndexHoldingTimebomb]: result.draw
      ? game.gameAttributes[TimebombAttributes.PlayerIndexHoldingTimebomb]
      : [1, 0][result.winnerIndex!],
    [TimebombAttributes.Exploded]: didExplode(
      game.gameAttributes[TimebombAttributes.GameCount]
    ),
  };
};

export const adjustPlayResultForTimebomb = (
  timebombExploded: boolean,
  playerHoldingBombIndex: number,
  playResult: PlayResult
): PlayResult => {
  if (!timebombExploded) {
    return playResult;
  }

  const updatedPointDiffs: [number, number] = [
    playResult.pointDiffs[0],
    playResult.pointDiffs[1],
  ];

  const playerNotHoldingBombIndex = [1, 0][playerHoldingBombIndex];

  //Give trophy to the person not holding bomb
  const updatedTrophies: [Counter, Counter] = [
    { ...playResult.trophies[0] },
    { ...playResult.trophies[1] },
  ];
  updatedTrophies[playerNotHoldingBombIndex] = counterService.incrementCounter(
    updatedTrophies[playerNotHoldingBombIndex],
    1
  );

  //Assign bonus points to person not holding bomb
  const updatedPoints: [Counter, Counter] = [
    { ...playResult.points[0] },
    { ...playResult.points[1] },
  ];

  updatedPointDiffs[playerNotHoldingBombIndex] +=
    playResult.bonusPoints.value + 1;
  updatedPoints[playerNotHoldingBombIndex] = counterService.incrementCounter(
    updatedPoints[playerNotHoldingBombIndex],
    updatedPointDiffs[playerNotHoldingBombIndex]
  );

  return {
    ...playResult,
    points: updatedPoints,
    trophies: updatedTrophies,
    bonusPoints: counterService.resetCounter(playResult.bonusPoints),
    pointDiffs: updatedPointDiffs,
    trophyWon: true,
  };
};
