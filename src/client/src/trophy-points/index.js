import { COUNTER_API_BASE_URL } from '../environment';

const getCounters = processCounters => {
  return fetch(`${COUNTER_API_BASE_URL}`)
    .then(resp => resp.json())
    .then(scoreboard => scoreboard.counters)
    .then(counters => processCounters(counters));
};

const adaptToCountersByName = counters => {
  const countersByName = {};

  Object.keys(counters).forEach(counterId => {
    const counter = counters[counterId];
    countersByName[counter.name] = {
      ...counter,
      id: counterId,
    };
  });

  return countersByName;
};

export const init = (players, onLoaded) => {
  getCounters(counters => {
    const countersByName = adaptToCountersByName(counters);
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

const getTrophyGoal = () => {
  return 10; // TODO: get from counter board
};

export default {
  getTrophyGoal,
};
