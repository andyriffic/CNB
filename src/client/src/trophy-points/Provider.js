import React, { useState, useEffect } from 'react';
import Context from './Context';
import { init } from './';

const Provider = ({ children }) => {
  const [trophyPoints, setTrophyPoints] = useState({
    loaded: false,
  });

  useEffect(() => {
    init(['MELB', 'XIAN'], trophyState => {
      setTrophyPoints(trophyState);
    });
  }, []);

  return <Context.Provider value={trophyPoints}>{children}</Context.Provider>;
};

export default Provider;
