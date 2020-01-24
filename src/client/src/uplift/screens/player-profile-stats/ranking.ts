import { PlayerStatsRecord, PlayerStatsRecordWithRanking } from '../../types';

export const groupRankings = (
  playerRankings: PlayerStatsRecordWithRanking[]
): PlayerStatsRecordWithRanking[][] => {
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

  let lastScore = playerRankings[0].rank;
  let tempRankingGroup: PlayerStatsRecordWithRanking[] = [];
  const groupedRankings = [];
  playerRankings.forEach(ranking => {
    if (ranking.player_name === 'Guest') {
      // TODO: filter guest out on server
      return;
    }
    if (ranking.rank === lastScore) {
      tempRankingGroup.push(ranking);
      return;
    }

    lastScore = ranking.rank;

    groupedRankings.push(tempRankingGroup);
    tempRankingGroup = [ranking];
  });

  groupedRankings.push(tempRankingGroup);

  return groupedRankings;
};

const sortByRankScore = (results: PlayerStatsRecordWithRanking[]) => {
  return results.sort((a, b) => {
    if (a.rank === b.rank) {
      return 0;
    }
    return a.rank < b.rank ? 1 : -1;
  });
};

export const rankPlayers = (
  playerRecords: PlayerStatsRecord[]
): PlayerStatsRecordWithRanking[] => {
  const recordsWithRanking = playerRecords.map(playerRecord => {
    return {
      ...playerRecord,
      rank:
        parseInt(playerRecord.times_won.toString()) * 2 +
        parseInt(playerRecord.times_drawn.toString()) -
        parseInt(playerRecord.times_lost.toString()),
    };
  });

  return sortByRankScore(recordsWithRanking);
};
