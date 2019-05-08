export const playerLeaderboardQuery = `SELECT *
FROM 
    (SELECT a.player,
         a.times_played,
         coalesce(b.times_won,
         0) AS times_won,
         a.points_won
    FROM 
        (SELECT player1.player,
         count(*) AS times_played,
         sum(player1.points) AS points_won
        FROM game_result
        GROUP BY  player1.player) a
        LEFT JOIN 
            (SELECT player1.player,
         count(*) AS times_won
            FROM game_result
            WHERE player1.winner
            GROUP BY  player1.player) b
                ON a.player=b.player)
        UNION ALL
        (SELECT c.player,
         c.times_played,
         coalesce(d.times_won,
         0) AS times_won,
         c.points_won
        FROM 
            (SELECT player2.player,
         count(*) AS times_played,
         sum(player2.points) AS points_won
            FROM game_result
            GROUP BY  player2.player) c
            LEFT JOIN 
                (SELECT player2.player,
         count(*) AS times_won
                FROM game_result
                WHERE player2.winner
                GROUP BY player2.player) d
                    ON c.player=d.player)
            ORDER BY  points_won desc, times_won desc, times_played desc, player;`;
