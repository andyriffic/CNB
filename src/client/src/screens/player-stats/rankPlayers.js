const sortByRankScore = results => {
  return results.sort((a, b) => {
    return a.rankScore < b.rankScore ? 1 : -1;
  });
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

export const rankByTripleWinDrawPlayedRatio = rawRankings => {
  const rankingsWithScore = rawRankings.map(ranking => {
    return {
      ...ranking,
      rankScore:
        (parseInt(ranking.times_won) * 20 +
          parseInt(ranking.times_drawn) * 10) /
        parseInt(ranking.times_played),
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
        (parseInt(ranking.times_won) * 2 + parseInt(ranking.times_drawn)) /
        (parseInt(ranking.times_lost) + 1),
    };
  });
  console.log('UNSORTED RANKINGS', rankingsWithScore);

  return sortByRankScore(rankingsWithScore);
};
