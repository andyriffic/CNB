import React, { useEffect, useState } from 'react';
import PowerUpContext from '../contexts/PowerUpContext';
import { getCounters, counterToPowerUpAdapter } from './updatePowerUp';

const PowerUpProvider = ({ children }) => {
  const [powerUps, setPowerUps] = useState({
    loaded: false,
    awardedPowerUps: {},
    awardPowerUps: awardedPowerUps => {
      setPowerUps(prevState => ({
        ...prevState,
        awardedPowerUps,
        awarded: true,
      }));
    },
    awardedPowerUpsSeen: () => {
      setPowerUps(prevState => ({
        ...prevState,
        awarded: false,
      }));
    },
    touch: () => {
      const stamp = Date.now();
      setPowerUps(prevState => ({
        ...prevState,
        lastTouched: stamp,
      }));
    },
  });

  useEffect(() => {
    getCounters(counterToPowerUpAdapter).then(powerUpsByPlayer => {
      // console.log('powerUpsByPlayer', powerUpsByPlayer);
      const newPowerUpState = {
        ...powerUps,
        ...powerUpsByPlayer,
        loaded: true,
      };
      setPowerUps(newPowerUpState);
    });
  }, []);

  return (
    <PowerUpContext.Provider value={powerUps}>
      {children}
    </PowerUpContext.Provider>
  );
};

export default PowerUpProvider;
