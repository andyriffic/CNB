export const gameHistoryQuery = `SELECT
  date,
  result.winner AS winner,       
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
