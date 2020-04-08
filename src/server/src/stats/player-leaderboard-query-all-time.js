export const playerLeaderboardQueryAllTime = `SELECT
    player_name,
    count(*) as times_played,
    sum(winner) as times_won,
    sum(trophy) as trophies_won,
    sum(draw) as times_drawn,
    (count(*) - sum(winner) - sum(draw)) as times_lost
FROM
    v_player_move_results
GROUP BY
    player_name`;
