import { getWeightedPowerUp } from './updatePowerUp';

describe('updatePowerUp', () => {
  describe('Given assigning 1000 random powerups', () => {
    it('then should at least assign all at some point', () => {
      let powerUpTotals = {
        DOUBLE: 0,
        STEAL: 0,
        SWAP: 0,
      };

      for (let i = 0; i < 1000; i++) {
        const weightedPowerUp = getWeightedPowerUp();
        powerUpTotals[weightedPowerUp] += 1;
      }

      expect(powerUpTotals.DOUBLE).toBeGreaterThan(0);
      expect(powerUpTotals.STEAL).toBeGreaterThan(0);
      expect(powerUpTotals.SWAP).toBeGreaterThan(0);
    });
  });
});
