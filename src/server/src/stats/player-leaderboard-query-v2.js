export const playerLeaderboardQueryV2 = `SELECT
    player_name,
    count(*) as times_played,
    sum(winner) as times_won,
    sum(trophy) as trophies_won,
    sum(draw) as times_drawn,
    (count(*) - sum(winner) - sum(draw)) as times_lost
FROM
    v_player_move_results
WHERE 
    extract(YEAR from cast(from_iso8601_timestamp(game_date) as TIMESTAMP)) = 2020
GROUP BY
    player_name`;
