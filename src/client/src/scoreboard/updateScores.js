const delayMilliseconds = 9000;

export const updateScores = (scores, { winner, draw }) => {
  if (!scores) return;

  if (draw) {
    scores.BONUS.add(1, scores).then(updateBonusPointsLocally => {
      setTimeout(() => {
        updateBonusPointsLocally();
      }, delayMilliseconds);
    });
    return;
  }

  const winnerScore = scores[winner];
  if (!winnerScore) return;

  const bonusPoints = scores.BONUS.value;
  const pointsToAdd = 1 + bonusPoints;

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
};
