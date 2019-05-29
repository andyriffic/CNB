export const groupPlayerRankings = playerRankings => {
  // Take a flat list of rankings and group into 1st, 2nd, 3rd etc
  /* e.g.
    [
      {player: 'A', times_won: 2},
      {player: 'B', times_won: 2},
      {player: 'C', times_won: 1},
    ]
    becomes =>
    [
      [{player: 'A', times_won: 2}, {player: 'B', times_won: 2}],
      [{player: 'C', times_won: 1}]
    ]

    This is so we can show equal placings
  */

  let lastScore = playerRankings[0].times_won;
  let tempRankingGroup = [];
  const groupedRankings = [];
  playerRankings.forEach(ranking => {
    if (ranking.player === 'Guest') {
      // TODO: filter guest out on server
      return;
    }
    if (ranking.times_won === lastScore) {
      tempRankingGroup.push(ranking);
      return;
    }

    lastScore = ranking.times_won;

    groupedRankings.push(tempRankingGroup);
    tempRankingGroup = [ranking];
  });

  groupedRankings.push(tempRankingGroup);

  return groupedRankings;
};
