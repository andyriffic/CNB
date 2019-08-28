export const playerLeaderboardQuery = `SELECT 
  team,
  sum(times_played) as times_played, 
  sum(times_won) as times_won, 
  sum(total_points) as total_points, 
  sum(times_lost) as times_lost, 
  sum(times_drawn) as times_drawn
FROM (
    (SELECT a.team,
         a.times_played,
         coalesce(b.times_won,
         0) AS times_won,
         a.total_points,
         coalesce(c.times_lost,
         0) AS times_lost,
         coalesce(d.times_drawn,
         0) AS times_drawn
    FROM 
        (SELECT player1.team,
         count(*) AS times_played,
         sum(player1.points) AS total_points
        FROM game_result
        WHERE theme='summer-winter'
        GROUP BY  player1.team) a
        LEFT JOIN 
            (SELECT player1.team,
         count(*) AS times_won
            FROM game_result
            WHERE player1.winner AND theme='summer-winter'
            GROUP BY  player1.team) b
                ON a.team=b.team
            LEFT JOIN 
                (SELECT player1.team,
         count(*) AS times_lost
                FROM game_result
                WHERE NOT player1.winner AND theme='summer-winter'
                        AND NOT result.draw
                GROUP BY  player1.team) c
                    ON a.team=c.team
                LEFT JOIN 
                    (SELECT player1.team,
         count(*) AS times_drawn
                    FROM game_result
                    WHERE result.draw AND theme='summer-winter'
                    GROUP BY  player1.team) d
                        ON a.team=d.team)
                UNION ALL
                (SELECT a.team,
         a.times_played,
         coalesce(b.times_won,
         0) AS times_won,
         a.total_points,
         coalesce(c.times_lost,
         0) AS times_lost,
         coalesce(d.times_drawn,
         0) AS times_drawn
                FROM 
                    (SELECT player2.team,
         count(*) AS times_played,
         sum(player2.points) AS total_points
                    FROM game_result
                    WHERE theme='summer-winter'
                    GROUP BY  player2.team) a
                    LEFT JOIN 
                        (SELECT player2.team,
         count(*) AS times_won
                        FROM game_result
                        WHERE player2.winner AND theme='summer-winter'
                        GROUP BY  player2.team) b
                            ON a.team=b.team
                        LEFT JOIN 
                            (SELECT player2.team,
         count(*) AS times_lost
                            FROM game_result
                            WHERE NOT player2.winner AND theme='summer-winter'
                                    AND NOT result.draw
                            GROUP BY  player2.team) c
                                ON a.team=c.team
                            LEFT JOIN 
                                (SELECT player2.team,
         count(*) AS times_drawn
                                FROM game_result
                                WHERE result.draw AND theme='summer-winter'
                                GROUP BY  player2.team) d
                                    ON a.team=d.team)
                            ORDER BY  times_won desc, total_points desc, times_played desc, team
      )
  group by team;`;
