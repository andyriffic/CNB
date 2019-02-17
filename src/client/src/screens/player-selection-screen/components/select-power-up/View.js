import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageSubTitle, Button } from '../../../styled';
import PowerUpContext from '../../../../contexts/PowerUpContext';
import PowerUpBadge from '../../../../components/power-up-badges';

const PowerUpListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectablePowerUp = styled.div`
  display: flex;
  cursor: pointer;
  width: 50vmin;
  height: 50vmin;
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
      <PowerUpListContainer>
        {playerPowerUps.map(powerUp =>
          powerUp.count ? (
            <SelectablePowerUp
              key={powerUp.type}
              onClick={() => onPowerUpSelected(powerUp.type)}
            >
              <PowerUpBadge type={powerUp.type} bigText>
                {powerUp.type} ({powerUp.count})
              </PowerUpBadge>
            </SelectablePowerUp>
          ) : null
        )}
      </PowerUpListContainer>
      <PowerUpListContainer>
        <Button onClick={() => onPowerUpSelected('NONE')}>None</Button>
      </PowerUpListContainer>
    </div>
  );
};

export default View;
