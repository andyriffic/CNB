import React, { useEffect, useState } from 'react';
import PowerUpContext from '../contexts/PowerUpContext';
import { COUNTER_API_BASE_URL } from '../environment';
import PowerUpService from './PowerUpService';

const PowerUpProvider = ({ children }) => {
  const [powerUps, setPowerUps] = useState({ loaded: false });
  let powerUpService = new PowerUpService();

  useEffect(() => {
    fetch(`${COUNTER_API_BASE_URL}`)
      .then(resp => resp.json())
      .then(scoreboard => scoreboard.counters)
      .then(scores => {
        powerUpService.initialisePlayerPowerUps(scores);
        setPowerUps({ ...powerUpService.powerUpsByPlayer, loaded: true });
      });
  }, []);

  return (
    <PowerUpContext.Provider value={powerUps}>
      {children}
    </PowerUpContext.Provider>
  );
};

export default PowerUpProvider;
