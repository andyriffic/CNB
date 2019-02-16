import { adjustPowerUpCount } from '../power-ups/updatePowerUp';
const delayMilliseconds = 9000;

export const updateScores = (scores, data) => {
  if (!scores) return;

  console.log('SCORING DATA', data);

  if (data.draw) {
    scores.BONUS.add(1, scores).then(updateBonusPointsLocally => {
      setTimeout(() => {
        updateBonusPointsLocally();
      }, delayMilliseconds);
    });
    return;
  }

  const winnerScore = scores[data.winner];
  if (!winnerScore) return;

  const bonusPoints = scores.BONUS.value;
  let pointsToAdd = 1 + bonusPoints;

  if (data.winnerPowerUp && data.winnerPowerUp !== 'NONE') {
    if (data.winnerPowerUp === 'DOUBLE') {
      pointsToAdd *= 2;
    }

    adjustPowerUpCount(data.winner, data.winnerPowerUp, -1);
  }

  if (data.loserPowerUp && data.loserPowerUp !== 'NONE') {
    adjustPowerUpCount(data.loser, data.loserPowerUp, -1);
  }

  winnerScore.add(pointsToAdd, scores).then(updateScoresLocally => {
    // Delay updating player score
    setTimeout(() => {
      const newScores = updateScoresLocally();
      if (bonusPoints) {
        // Update bonus points straight away with current score state (otherwise we get out of sync)
        scores.BONUS.subtract(bonusPoints, newScores).then(updateBonusLocally =>
          updateBonusLocally()
        );
      }
    }, delayMilliseconds);
  });

  return { XIAN: ['DOUBLE'] };
};
