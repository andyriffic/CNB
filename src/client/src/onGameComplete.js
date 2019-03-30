import { getStandardPointsAssignment } from './scoreboard/updateScores';
import { applyPowerUpsToPointsAssignment } from './power-ups/appliers';
import {
  adjustPowerUpCount,
  getWeightedRandomPlayer,
  getWeightedRandomPowerUp,
  awardPowerUpToPlayer,
} from './power-ups/updatePowerUp';
import { checkTrophyAward, awardTrophyToPlayer } from './trophy-points';
import { adjustCounter } from './utils/counters';

export const onGameComplete = (
  gameResult,
  gameState,
  originalScores,
  trophies,
  onComplete
) => {
  console.log('onGameComplete: trophies', trophies);

  // determine normal points awarded
  const standardPointsAssigned = getStandardPointsAssignment(
    originalScores,
    gameResult
  );

  console.log('onGameComplete: standardPointsAssigned', standardPointsAssigned);

  // adjust points for powerups
  const powerUpAdjustedPointsAssigned = applyPowerUpsToPointsAssignment(
    standardPointsAssigned,
    gameResult,
    gameState,
    originalScores
  );

  console.log(
    'onGameComplete: powerUpAdjustedPointsAssigned',
    powerUpAdjustedPointsAssigned
  );

  const localUpdatedScores = {
    ...originalScores,
    [gameState.player1.name]: {
      value:
        originalScores[gameState.player1.name].value +
        powerUpAdjustedPointsAssigned.player1,
    },
    [gameState.player2.name]: {
      value:
        originalScores[gameState.player2.name].value +
        powerUpAdjustedPointsAssigned.player2,
    },
    BONUS: {
      value: originalScores.BONUS.value + powerUpAdjustedPointsAssigned.bonus,
    },
  };

  console.log('onGameComplete: updatedScores', localUpdatedScores);

  // subtract used powerups
  adjustPowerUpCount(gameState.player1.name, gameState.player1.powerUp, -1);
  adjustPowerUpCount(gameState.player2.name, gameState.player2.powerUp, -1);

  // award powerups
  let awardedPowerUps = {};
  if (gameResult.draw) {
    const playerToAwardPowerUpTo = getWeightedRandomPlayer(localUpdatedScores);
    const randomPowerUp = getWeightedRandomPowerUp();
    console.log(
      'onGameComplete: awardPowerUp',
      playerToAwardPowerUpTo,
      randomPowerUp
    );

    awardPowerUpToPlayer(playerToAwardPowerUpTo, randomPowerUp);
    awardedPowerUps[playerToAwardPowerUpTo] = randomPowerUp;
  }

  // check trophy points
  let trophyAdjustedPointsAssigned = powerUpAdjustedPointsAssigned;
  const trophyWinner = checkTrophyAward(trophies, localUpdatedScores);
  console.log('onGameComplete: trophy Winner', trophyWinner);

  if (trophyWinner) {
    awardTrophyToPlayer(trophyWinner);
    trophyAdjustedPointsAssigned = {
      ...powerUpAdjustedPointsAssigned,
      player1: -originalScores[gameState.player1.name].value,
      player2: -originalScores[gameState.player2.name].value,
    };
    console.log(
      'onGameComplete: trophyAdjustedPointsAssigned',
      trophyAdjustedPointsAssigned
    );
  }

  // persist final scores now?
  // TODO: update scores locally once all counters updated?
  console.log('onGameComplete: persist counters', trophyAdjustedPointsAssigned);
  Promise.all([
    adjustCounter(gameState.player1.name, trophyAdjustedPointsAssigned.player1),
    adjustCounter(gameState.player2.name, trophyAdjustedPointsAssigned.player2),
    adjustCounter('BONUS', trophyAdjustedPointsAssigned.bonus),
  ]).then(/* What to do here? */);

  onComplete(localUpdatedScores, awardedPowerUps, trophyWinner);
};
