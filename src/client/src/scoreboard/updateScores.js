import {
  adjustPowerUpCount,
  awardRandomPowerUpToPlayer,
} from '../power-ups/updatePowerUp';
const delayMilliseconds = 18000;

export const updateScores = (scores, data) => {
  return new Promise(resolve => {
    if (!scores) resolve();

    console.log('FINSISED DATA', data);

    if (!data.draw) {
      if (data.winnerPowerUp && data.winnerPowerUp !== 'NONE') {
        adjustPowerUpCount(data.winner, data.winnerPowerUp, -1);
      }

      if (data.loserPowerUp && data.loserPowerUp !== 'NONE') {
        adjustPowerUpCount(data.loser, data.loserPowerUp, -1);
      }
    } else {
      if (data.player1PowerUp && data.player1PowerUp !== 'NONE') {
        adjustPowerUpCount('XIAN', data.player1PowerUp, -1);
      }
      if (data.player2PowerUp && data.player2PowerUp !== 'NONE') {
        adjustPowerUpCount('MELB', data.player2PowerUp, -1);
      }
    }

    // :(
    const awardedPowerUps = {};

    const winnerPowerUpAwarded = awardRandomPowerUpToPlayer(
      data.draw ? 'MELB' : data.winner
    ).then(powerUp => {
      awardedPowerUps[data.draw ? 'MELB' : data.winner] = powerUp;
    });
    const loserPowerUpAwarded = awardRandomPowerUpToPlayer(
      data.draw ? 'XIAN' : data.loser
    ).then(powerUp => {
      awardedPowerUps[data.draw ? 'XIAN' : data.loser] = powerUp;
    });

    Promise.all([winnerPowerUpAwarded, loserPowerUpAwarded]).then(() => {
      resolve(awardedPowerUps);
    });

    if (data.draw) {
      scores.BONUS.add(1, scores).then(updateBonusPointsLocally => {
        setTimeout(() => {
          updateBonusPointsLocally();
        }, delayMilliseconds);
      });
      return;
    }

    const winnerScore = scores[data.winner];
    const loserScore = scores[data.loser];
    if (!(winnerScore && loserScore)) return;

    const bonusPoints = scores.BONUS.value;
    let winnerPointsToAdd = 1 + bonusPoints;
    let loserPointsToSubtract = 0;

    // TODO: move powerup code
    if (data.winnerPowerUp && data.winnerPowerUp !== 'NONE') {
      if (data.winnerPowerUp === 'DOUBLE') {
        winnerPointsToAdd *= 2;
      } else if (data.winnerPowerUp === 'STEAL') {
        winnerPointsToAdd += 1;
        loserPointsToSubtract = 1;
      } else if (data.winnerPowerUp === 'SWAP') {
        const scoreDiff = loserScore.value - winnerScore.value;
        winnerPointsToAdd = scoreDiff + bonusPoints;
        loserPointsToSubtract = scoreDiff;
      }
    }

    // TODO: seriously need to sort out how these points get updated! :(
    winnerScore.add(winnerPointsToAdd, scores).then(updateScoresLocally => {
      // Delay updating player score
      setTimeout(() => {
        const newScoresAfterWinnerAwarded = updateScoresLocally();
        if (loserPointsToSubtract) {
          loserScore
            .subtract(loserPointsToSubtract, newScoresAfterWinnerAwarded)
            .then(updateBonusLocally => {
              const newScoresAfterLoserSubtracted = updateBonusLocally();
              if (bonusPoints) {
                // Update bonus points straight away with current score state (otherwise we get out of sync)
                scores.BONUS.subtract(
                  bonusPoints,
                  newScoresAfterLoserSubtracted
                ).then(updateBonusLocally => updateBonusLocally());
              }
            });
        } else if (bonusPoints) {
          scores.BONUS.subtract(bonusPoints, newScoresAfterWinnerAwarded).then(
            updateBonusLocally => updateBonusLocally()
          );
        }
      }, delayMilliseconds);
    });
  });
};
