import React, { useState } from 'react';
import Context from './Context';
import { init } from './';

const Provider = ({ children }) => {
  const initTrophyPoints = (state, setState) => {
    init(['MELB', 'XIAN'], state, trophyState => {
      setState(trophyState);
    });
  };

  const [trophyPoints, setTrophyPoints] = useState({
    loaded: false,
    // winner: 'XIAN',
    init: () => initTrophyPoints(trophyPoints, setTrophyPoints),
    setWinner: (state, winner) => {
      setTrophyPoints({
        ...state,
        winner,
      });
    },
  });

  return <Context.Provider value={trophyPoints}>{children}</Context.Provider>;
};

export default Provider;
