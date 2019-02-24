import {
  getWeightedItem,
  getWeightedRandomPlayer,
  powerUpWeights,
} from './updatePowerUp';

describe('updatePowerUp', () => {
  describe('Given assigning 1000 random powerups', () => {
    it('then should at least assign all at some point', () => {
      let powerUpTotals = {
        DOUBLE: 0,
        STEAL: 0,
        SWAP: 0,
      };

      for (let i = 0; i < 1000; i++) {
        const weightedPowerUp = getWeightedItem(powerUpWeights).type;
        powerUpTotals[weightedPowerUp] += 1;
      }

      console.log('RANDOM powerUpTotals TOTAL', powerUpTotals);

      expect(powerUpTotals.DOUBLE).toBeGreaterThan(0);
      expect(powerUpTotals.STEAL).toBeGreaterThan(0);
      expect(powerUpTotals.SWAP).toBeGreaterThan(0);
    });
  });

  describe('Given assigning 1000 random players', () => {
    it('then should at least assign all at some point', () => {
      let playerTotals = {
        MELB: 0,
        XIAN: 0,
      };

      const scores = {
        MELB: { value: 10 },
        XIAN: { value: 7 },
      };

      for (let i = 0; i < 1000; i++) {
        const weightedPlayerName = getWeightedRandomPlayer(scores);
        playerTotals[weightedPlayerName] += 1;
      }

      console.log('RANDOM playerTotals TOTAL', playerTotals);
      expect(playerTotals.XIAN).toBeGreaterThan(0);
      expect(playerTotals.MELB).toBeGreaterThan(0);
      expect(playerTotals.XIAN).toBeGreaterThan(playerTotals.MELB); // Test weighting is correct
    });
  });
});
