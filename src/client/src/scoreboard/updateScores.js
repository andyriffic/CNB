export const getStandardPointsAssignment = (scores, gameFinishedResult) => {
  if (gameFinishedResult.draw) {
    return {
      player1: 0,
      player2: 0,
      bonus: 1,
    };
  }

  const bonusPoints = scores.BONUS ? scores.BONUS.value : 0;

  return {
    player1: 0,
    player2: 0,
    [gameFinishedResult.winnerKey]: 1 + bonusPoints,
    [gameFinishedResult.loserKey]: 0,
    bonus: bonusPoints ? -bonusPoints : 0,
  };
};
