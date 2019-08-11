const sortByRankScore = results => {
  return results.sort((a, b) => {
    return a.rankScore < b.rankScore ? 1 : -1;
  });
};

export const rankByTotalWins = rawRankings => {
  const rankingsWithScore = rawRankings.map(ranking => {
    return {
      ...ranking,
      rankScore: parseInt(ranking.times_won),
    };
  });
  console.log('UNSORTED RANKINGS', rankingsWithScore);

  return sortByRankScore(rankingsWithScore);
};

export const rankByWinDrawPlayedRatio = rawRankings => {
  const rankingsWithScore = rawRankings.map(ranking => {
    return {
      ...ranking,
      rankScore:
        (parseInt(ranking.times_won) * 2 + parseInt(ranking.times_drawn)) /
        parseInt(ranking.times_played),
    };
  });
  console.log('UNSORTED RANKINGS', rankingsWithScore);

  return sortByRankScore(rankingsWithScore);
};

export const rankByWinsDrawsOverLosses = rawRankings => {
  const rankingsWithScore = rawRankings.map(ranking => {
    return {
      ...ranking,
      rankScore:
        (parseInt(ranking.times_won) * 2 + parseInt(ranking.times_drawn)) /
        (parseInt(ranking.times_lost) + 1),
    };
  });
  console.log('UNSORTED RANKINGS', rankingsWithScore);

  return sortByRankScore(rankingsWithScore);
};

export const rankByWinDrawPlayedNegativeLossRatio = rawRankings => {
  const rankingsWithScore = rawRankings.map(ranking => {
    return {
      ...ranking,
      rankScore:
        (parseInt(ranking.times_won) * 2 +
          parseInt(ranking.times_drawn) -
          parseInt(ranking.times_lost)) /
        parseInt(ranking.times_played),
    };
  });
  console.log('UNSORTED RANKINGS', rankingsWithScore);

  return sortByRankScore(rankingsWithScore);
};

export const rankByWinDrawLossRatio = rawRankings => {
  const rankingsWithScore = rawRankings.map(ranking => {
    return {
      ...ranking,
      rankScore:
        (parseInt(ranking.times_won) * 4 +
          parseInt(ranking.times_drawn) * 2 +
          parseInt(ranking.times_lost) * 1) /
        parseInt(ranking.times_played),
    };
  });
  console.log('UNSORTED RANKINGS', rankingsWithScore);

  return sortByRankScore(rankingsWithScore);
};
