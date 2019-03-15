import React, { useEffect, useState } from 'react';
import ScoreboardContext from '../contexts/ScoreboardContext';
import { getCountersByName } from '../utils/counters';

const ScoreboardApi = ({ children }) => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    getCountersByName(countersByName => {
      setScores({
        ...countersByName,
        set: setScores,
      });
    });
  }, []);

  return (
    <ScoreboardContext.Provider value={scores}>
      {children}
    </ScoreboardContext.Provider>
  );
};

export default ScoreboardApi;
