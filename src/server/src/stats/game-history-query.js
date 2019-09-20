export const gameHistoryQuery = `SELECT date,
         theme AS theme,
         result.winner AS winner,
         player1.player AS player1,
         player1.team AS team1,
         player2.player AS player2,
         player2.team AS team2,
    CASE
      WHEN result.draw THEN true
      ELSE NULL
    END AS draw,
    CASE
      WHEN player1.trophy THEN true
      WHEN player2.trophy THEN true
      ELSE NULL
    END AS trophy
FROM game_result
ORDER BY  date desc;`;
