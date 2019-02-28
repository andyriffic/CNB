import { COUNTER_API_BASE_URL } from '../environment';

export const getCounters = processCounters => {
  return fetch(`${COUNTER_API_BASE_URL}`)
    .then(resp => resp.json())
    .then(scoreboard => scoreboard.counters)
    .then(counters => processCounters(counters));
};

export const counterToPowerUpAdapter = counters => {
  const powerUpsByPlayer = {};

  Object.keys(counters).forEach(counterId => {
    const counter = counters[counterId];

    // PowerUp Counter name in the form 'POWER_{type}_{team}' e.g. 'POWER_DOUBLE_MELB'
    const tokens = counter.name.split('_');

    if (tokens[0] !== 'POWER') {
      return;
    }

    const playerName = tokens[2];
    const powerUp = tokens[1];

    const playerPowerUps = powerUpsByPlayer[playerName] || [];
    playerPowerUps.push({ type: powerUp, count: counter.value });
    powerUpsByPlayer[playerName] = playerPowerUps;
  });

  return powerUpsByPlayer;
};

export const counterIdForCounterName = counterName => counters => {
  let foundCounterId;
  Object.keys(counters).forEach(counterId => {
    const counter = counters[counterId];
    if (counter.name === counterName) {
      foundCounterId = counterId;
    }
  });
  return foundCounterId;
};

export const adjustPowerUpCount = (player, powerUp, by) => {
  const counterName = `POWER_${powerUp}_${player}`;

  getCounters(counterIdForCounterName(counterName)).then(counterId => {
    fetch(`${COUNTER_API_BASE_URL}/${counterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        type: 'INCREMENT',
        by,
      }),
    }).then(resp => resp.json());
  });
};

export const getWeightedItem = weightedList => {
  // https://medium.com/@peterkellyonline/weighted-random-selection-3ff222917eb6
  const totalWeights = weightedList.reduce((acc, powerUp) => {
    return acc + powerUp.weight;
  }, 0);

  let randomWeight = Math.floor(Math.random() * totalWeights) + 1;
  let randomItem;
  for (let i = 0; i < weightedList.length; i++) {
    randomWeight -= weightedList[i].weight;
    if (randomWeight <= 0) {
      randomItem = weightedList[i];
      break;
    }
  }

  return randomItem;
};

export const powerUpWeights = [
  { type: 'DOUBLE', weight: 5 },
  { type: 'STEAL', weight: 10 },
  { type: 'SWAP', weight: 1 },
];

export const awardRandomPowerUpToPlayer = player => {
  return new Promise(resolve => {
    getCounters(counterToPowerUpAdapter).then(powerUpsByPlayer => {
      const playerPowerUps = powerUpsByPlayer[player];
      if (!playerPowerUps) {
        return;
      }
      const randomPowerUpName = getWeightedItem(powerUpWeights).type;

      adjustPowerUpCount(player, randomPowerUpName, 1);
      resolve(randomPowerUpName);
    });
  });
};

export const getWeightedRandomPlayer = scores => {
  // Weight with over players score so favors player that is behind
  const playerWeightings = [
    { playerName: 'MELB', weight: scores.XIAN.value },
    { playerName: 'XIAN', weight: scores.MELB.value },
  ];

  // console.log('WEIGHTING', playerWeightings);

  const randomWeightedPlayer = getWeightedItem(playerWeightings);
  return randomWeightedPlayer.playerName;
};
