import { selectRandomOneOf } from '../../utils/random';

enum TimebombAttributes {
  PlayerIndexHoldingTimebomb = 'PlayerIndexHoldingTimebomb',
  Exploded = 'Exploded',
}

export const getStartingGameAttributes = (
  gameNumber: number
): { [key: TimebombAttributes]: any } => {
  return {
    [TimebombAttributes.PlayerIndexHoldingTimebomb]: selectRandomOneOf([0, 1]),
    [TimebombAttributes.Exploded]:
      gameNumber === 0 ? false : selectRandomOneOf([true, false]),
  };
};
