import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageSubTitle } from '../../../styled';
import PowerUpContext from '../../../../contexts/PowerUpContext';

const PowerUp = styled.button`
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
`;

const View = ({ playerKey, onPowerUpSelected }) => {
  const powerUps = useContext(PowerUpContext);

  if (!powerUps.loaded) {
    return null;
  }

  const playerPowerUps = powerUps[playerKey];

  return (
    <div>
      <PageSubTitle>Select PowerUp 選擇開機</PageSubTitle>
      {playerPowerUps.map(powerUp => (
        <PowerUp
          key={powerUp.type}
          onClick={() => onPowerUpSelected(powerUp.type)}
        >
          {powerUp.type} ({powerUp.count})
        </PowerUp>
      ))}
      <PowerUp onClick={() => onPowerUpSelected('NONE')}>None</PowerUp>
    </div>
  );
};

export default View;
