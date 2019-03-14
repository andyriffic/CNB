import React, { useState, useEffect } from 'react';
import Context from './Context';
import { init } from './';

const Provider = ({ children }) => {
  const initTrophyPoints = setState => {
    init(['MELB', 'XIAN'], trophyState => {
      console.log('TROPHY PROVIDER', trophyState);
      setState(trophyState);
    });
  };

  const [trophyPoints, setTrophyPoints] = useState({
    loaded: false,
    init: () => initTrophyPoints(setTrophyPoints),
  });

  // useEffect(() => {
  //   init(['MELB', 'XIAN'], trophyState => {
  //     console.log('TROPHY PROVIDER', trophyState);
  //     setTrophyPoints(trophyState);
  //   });
  // }, []);

  return <Context.Provider value={trophyPoints}>{children}</Context.Provider>;
};

export default Provider;
