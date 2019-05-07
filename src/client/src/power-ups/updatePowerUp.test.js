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

  describe('Given assigning 1000 powerups to players', () => {
    it('then should at least assign all at some point', () => {
      let playerTotals = {
        MELB: 0,
        XIAN: 0,
      };

      const scores = {
        MELB: { value: 10 },
        XIAN: { value: 7 },
        TROPHY_MELB: { value: 0 },
        TROPHY_XIAN: { value: 0 },
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

    it('then should favor the team with the least trophies and points', () => {
      let playerTotals = {
        MELB: 0,
        XIAN: 0,
      };

      const scores = {
        MELB: { value: 5 },
        XIAN: { value: 8 },
        TROPHY_MELB: { value: 3 },
        TROPHY_XIAN: { value: 0 },
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
