import { selectRandomOneOf } from '../../utils/random';
import { Game } from './types';
import { GameResult } from '../game-result/types';

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

export const getMoveGameAttributes = (
  game: Game,
  result: GameResult
): { [name: string]: any } => {
  return {
    ...game.gameAttributes,
    [TimebombAttributes.PlayerIndexHoldingTimebomb]: result.draw
      ? game.gameAttributes[TimebombAttributes.PlayerIndexHoldingTimebomb]
      : [1, 0][result.winnerIndex!],
    [TimebombAttributes.Exploded]:
      game.gameAttributes[TimebombAttributes.GameCount] === 2,
  };
};
