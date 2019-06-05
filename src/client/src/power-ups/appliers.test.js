import { applyPowerUpsToPointsAssignment } from './appliers';
import { POWER_UP_TYPE } from './constants';

describe('PowerUp Appliers', () => {
  let scores, gameFinishedResult, gameState;

  describe('given player1 is winner', () => {
    beforeAll(() => {
      gameFinishedResult = {
        winnerKey: 'player1',
        loserKey: 'player2',
      };
    });

    describe('when winning with no powerup', () => {
      beforeAll(() => {
        gameState = {
          player1: {
            powerUp: POWER_UP_TYPE.NONE,
            name: 'P1',
          },
          player2: {
            powerUp: POWER_UP_TYPE.NONE,
            name: 'P2',
          },
        };
      });

      it('then does not change final scores', () => {
        const currentPointsAssignment = {
          player1: 0,
          player2: 0,
          bonus: 0,
        };
        const pointsAssignment = applyPowerUpsToPointsAssignment(
          currentPointsAssignment,
          gameFinishedResult,
          gameState
        );
        expect(pointsAssignment).toEqual(currentPointsAssignment);
      });
    });

    describe('when winning with DOUBLE POINTS PowerUp', () => {
      beforeAll(() => {
        gameState = {
          player1: {
            powerUp: POWER_UP_TYPE.DOUBLE_POINTS,
            name: 'P1',
          },
          player2: {
            powerUp: POWER_UP_TYPE.NONE,
            name: 'P2',
          },
        };
      });

      it('then applies correct PowerUp scores', () => {
        const currentPointsAssignment = {
          player1: 1,
          player2: 0,
          bonus: 0,
        };
        const pointsAssignment = applyPowerUpsToPointsAssignment(
          currentPointsAssignment,
          gameFinishedResult,
          gameState
        );
        expect(pointsAssignment).toEqual({
          player1: 2,
          player2: 0,
          bonus: 0,
        });
      });
    });

    describe('when winning with POINTS STEAL PowerUp', () => {
      beforeAll(() => {
        gameState = {
          player1: {
            powerUp: POWER_UP_TYPE.STEAL_POINTS,
            name: 'P1',
          },
          player2: {
            powerUp: POWER_UP_TYPE.NONE,
            name: 'P2',
          },
        };
      });

      it('then applies correct PowerUp scores', () => {
        const currentPointsAssignment = {
          player1: 1,
          player2: 0,
          bonus: 0,
        };

        const pointsAssignment = applyPowerUpsToPointsAssignment(
          currentPointsAssignment,
          gameFinishedResult,
          gameState
        );
        expect(pointsAssignment).toEqual({
          player1: 1,
          player2: -1,
          bonus: 0,
        });
      });
    });

    describe('when winning with POINTS SWAP PowerUp', () => {
      beforeAll(() => {
        gameState = {
          player1: {
            powerUp: POWER_UP_TYPE.SWAP_POINTS,
            name: 'P1',
          },
          player2: {
            powerUp: POWER_UP_TYPE.NONE,
            name: 'P2',
          },
        };
      });

      it('then applies correct PowerUp scores when no bonus points', () => {
        const currentPointsAssignment = {
          player1: 1,
          player2: 0,
          bonus: 0,
        };

        const scores = {
          P1: { value: 8 },
          P2: { value: 10 },
        };

        const pointsAssignment = applyPowerUpsToPointsAssignment(
          currentPointsAssignment,
          gameFinishedResult,
          gameState,
          scores
        );
        expect(pointsAssignment).toEqual({
          player1: 2,
          player2: -2,
          bonus: 0,
        });
      });

      it('then applies correct PowerUp scores when bonus points', () => {
        const currentPointsAssignment = {
          player1: 3,
          player2: 0,
          bonus: -2,
        };

        const scores = {
          P1: { value: 8 },
          P2: { value: 10 },
        };

        const pointsAssignment = applyPowerUpsToPointsAssignment(
          currentPointsAssignment,
          gameFinishedResult,
          gameState,
          scores
        );
        expect(pointsAssignment).toEqual({
          player1: 4,
          player2: -2,
          bonus: -2,
        });
      });
    });
  });

  describe('given result is a draw', () => {
    beforeAll(() => {
      gameState = {
        player1: {
          powerUp: POWER_UP_TYPE.NONE,
          name: 'P1',
        },
        player2: {
          powerUp: POWER_UP_TYPE.NONE,
          name: 'P2',
        },
      };

      gameFinishedResult = {
        draw: true,
      };
    });

    it('then does not alter scores', () => {
      const currentPointsAssignment = {
        player1: 0,
        player2: 0,
        bonus: 0,
      };

      const pointsAssignment = applyPowerUpsToPointsAssignment(
        currentPointsAssignment,
        gameFinishedResult,
        scores
      );
      expect(pointsAssignment).toEqual(currentPointsAssignment);
    });
  });
});
