export const groupPlayerRankings = playerRankings => {
  // Take a flat list of rankings and group into 1st, 2nd, 3rd etc
  /* e.g.
    [
      {player: 'A', rankScore: 2},
      {player: 'B', rankScore: 2},
      {player: 'C', rankScore: 1},
    ]
    becomes =>
    [
      [{player: 'A', rankScore: 2}, {player: 'B', rankScore: 2}],
      [{player: 'C', rankScore: 1}]
    ]

    This is so we can show equal placings
  */

  let lastScore = playerRankings[0].rankScore;
  let tempRankingGroup = [];
  const groupedRankings = [];
  playerRankings.forEach(ranking => {
    if (ranking.player_name === 'Guest') {
      // TODO: filter guest out on server
      return;
    }
    if (ranking.rankScore === lastScore) {
      tempRankingGroup.push(ranking);
      return;
    }

    lastScore = ranking.rankScore;

    groupedRankings.push(tempRankingGroup);
    tempRankingGroup = [ranking];
  });

  groupedRankings.push(tempRankingGroup);

  return groupedRankings;
};
