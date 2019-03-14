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

const adaptToCounterIdForCounterName = counterName => counters => {
  let foundCounterId;
  Object.keys(counters).forEach(counterId => {
    const counter = counters[counterId];
    if (counter.name === counterName) {
      foundCounterId = counterId;
    }
  });
  return foundCounterId;
};

export const adjustCounter = (counterName, by) => {
  if (by === 0) {
    return Promise.resolve;
  }

  return getCounters(adaptToCounterIdForCounterName(counterName)).then(
    counterId => {
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
    }
  );
};

export const getCountersByName = onComplete => {
  getCounters(adaptToCountersByName).then(countersByName => {
    onComplete(countersByName);
  });
};
