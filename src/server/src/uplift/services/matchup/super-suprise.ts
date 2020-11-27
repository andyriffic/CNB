import { Game } from './types';
import { PlayResult } from '../play/types';

export enum SuperSupriseAttributes {
  GameCount = 'gameCount',
}

export const getSuperSupriseStartingGameAttributes = (
  previousGame?: Game
): { [key: SuperSupriseAttributes]: any } => {
  if (!previousGame) {
    return {
      [SuperSupriseAttributes.GameCount]: 1,
    };
  }

  return {
    ...previousGame.gameAttributes,
    [SuperSupriseAttributes.GameCount]:
      previousGame.gameAttributes[SuperSupriseAttributes.GameCount] + 1,
  };
};

export const getSuperSupriseMoveGameAttributes = (
  game: Game
): { [name: string]: any } => {
  return {
    ...game.gameAttributes,
  };
};

export const adjustPlayResultForSuperSuprise = (
  playResult: PlayResult
): PlayResult => {
  return playResult;
};
