import { POWER_UP_TYPE } from './constants';

export const applyPowerUpsToPointsAssignment = (
  currentPointsAssignment,
  gameFinishedResult,
  gameState,
  scores
) => {
  if (gameFinishedResult.draw) {
    return currentPointsAssignment;
  }

  const powerUpApplier =
    powerUpAppliers[gameState[gameFinishedResult.winnerKey].powerUp];

  return powerUpApplier(
    currentPointsAssignment,
    gameFinishedResult,
    gameState,
    scores
  );
};

const powerUpAppliers = {
  [POWER_UP_TYPE.NONE]: currentPointsAssignment => currentPointsAssignment,
  [POWER_UP_TYPE.DOUBLE_POINTS]: applyPowerUpDouble,
  [POWER_UP_TYPE.STEAL_POINTS]: applyPowerUpSteal,
  [POWER_UP_TYPE.SWAP_POINTS]: applyPowerUpSwap,
};

function applyPowerUpDouble(currentPointsAssignment, gameFinishedResult) {
  return {
    ...currentPointsAssignment,
    [gameFinishedResult.winnerKey]:
      currentPointsAssignment[gameFinishedResult.winnerKey] * 2,
  };
}

function applyPowerUpSteal(currentPointsAssignment, gameFinishedResult) {
  return {
    ...currentPointsAssignment,
    [gameFinishedResult.loserKey]: -1,
  };
}

function applyPowerUpSwap(
  currentPointsAssignment,
  gameFinishedResult,
  gameState,
  scores
) {
  const pointsDiff =
    scores[gameState[gameFinishedResult.loserKey].name].value -
    scores[gameState[gameFinishedResult.winnerKey].name].value;
  return {
    ...currentPointsAssignment,
    [gameFinishedResult.winnerKey]: pointsDiff + -currentPointsAssignment.bonus,
    [gameFinishedResult.loserKey]: -pointsDiff,
  };
}
