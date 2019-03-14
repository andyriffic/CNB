import { getCountersByName, adjustCounter } from '../utils/counters';

export const checkTrophyAward = (trophyState, scores) => {
  console.log('AWARD TROPHY', trophyState, scores);

  let trophyWinnerPlayerName;
  Object.keys(trophyState.players).forEach(playerName => {
    console.log('AWARD TO', playerName);
    if (scores[playerName].value >= trophyState.goal) {
      console.log(`${playerName} gets a trophy`);
      trophyWinnerPlayerName = playerName;
    }

    const counterName = `TROPHY_${playerName}`;
    console.log('TROPHY COUNTER', scores[counterName]);
  });

  return trophyWinnerPlayerName;
};

export const awardTrophyToPlayer = player => {
  const playerCounterName = `TROPHY_${player}`;
  adjustCounter(playerCounterName, 1);
};

export const init = (players, onLoaded) => {
  getCountersByName(countersByName => {
    const goal =
      (countersByName.TROPHY_GOAL && countersByName.TROPHY_GOAL.value) || 10;

    const trophyState = {
      loaded: true,
      goal,
      players: {},
    };

    players.forEach(player => {
      const playerCounterName = `TROPHY_${player}`;
      const playerTrophyTotal =
        (countersByName[playerCounterName] &&
          countersByName[playerCounterName].value) ||
        0;
      trophyState.players[player] = playerTrophyTotal;
    });

    onLoaded && onLoaded(trophyState);
  });
};
