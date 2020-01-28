export const gameHistoryQuery = `SELECT date,
         theme AS theme,
         mode AS gameMode,
         matchupid as matchupId,
         result.winner AS winner,
         player1.player AS player1,
         player1.move AS player1Move,
         player1.team AS team1,
         player2.player AS player2,
         player2.move AS player2Move,
         player2.team AS team2,
    CASE
      WHEN result.draw THEN true
      ELSE NULL
    END AS draw,
    CASE
      WHEN player1.trophy THEN 'player1'
      WHEN player2.trophy THEN 'player2'
    ELSE NULL
    END AS trophy
FROM game_result
ORDER BY  date desc;`;
