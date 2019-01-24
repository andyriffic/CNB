import React, { useEffect, useState } from 'react';
import ScoreboardContext from '../contexts/ScoreboardContext';
import { COUNTER_API_BASE_URL } from '../environment';

const ScoreboardApi = ({ children }) => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    fetch(`${COUNTER_API_BASE_URL}`)
      .then(resp => resp.json())
      .then(scoreboard => scoreboard.counters)
      .then(scores => {
        const mappedScores = createScoreboardService(scores, setScores);
        setScores(mappedScores);
      });
  }, []);

  return (
    <ScoreboardContext.Provider value={scores}>
      {children}
    </ScoreboardContext.Provider>
  );
};

export default ScoreboardApi;

const createScoreboardService = (scores, setScores) => {
  // TODO: rethink this idea :/
  // Mapping server scores to 'useful' local object with counter value and functions to add/subtract
  let mappedScores = {};
  Object.keys(scores).forEach(counterId => {
    mappedScores[scores[counterId].name] = {
      value: scores[counterId].value,
      add: (value, currentScores) => {
        return putCounterUpdate(counterId, 'INCREMENT', value).then(result => {
          return getUpdateStateFunction(
            counterId,
            scores,
            currentScores,
            result,
            setScores
          );
        });
      },
      subtract: (value, currentScores) => {
        return putCounterUpdate(counterId, 'DECREMENT', value).then(result => {
          return getUpdateStateFunction(
            counterId,
            scores,
            currentScores,
            result,
            setScores
          );
        });
      },
    };
  });

  return mappedScores;
};

function putCounterUpdate(counterId, type, value) {
  return fetch(`${COUNTER_API_BASE_URL}/${counterId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      type,
      by: value,
    }),
  }).then(resp => resp.json());
}

function getUpdateStateFunction(
  counterId,
  serverScores,
  localScores,
  updatedResult,
  setScores
) {
  // Create new version of scores and return a function that when called will apply the update to local state
  // Apologies for this being confusing, I don't have the brain power at the moment to re-write it :(
  const newScores = {
    ...localScores,
    [serverScores[counterId].name]: {
      ...localScores[serverScores[counterId].name],
      value: Object.values(updatedResult)[0].value,
    },
  };

  // Return function so can delay updating in the UI
  const updateLocalState = () => {
    setScores(newScores);
    return newScores;
  };
  return updateLocalState;
}
