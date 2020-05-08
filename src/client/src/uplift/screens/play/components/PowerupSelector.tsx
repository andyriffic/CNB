import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { PowerupBadge } from '../../../components/PowerupBadge';

const PowerupList = styled.div`
  margin: 0;
  padding: 0 0 20px;
  display: flex;
  /* transform: scale(0.7); */
  align-items: center;
`;

const PowerupSelectionItem = styled.button<{ selected: boolean }>`
  border: 5px solid ${props => (props.selected ? 'red' : 'transparent')};
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  margin-right: 10px;
  position: relative;
`;

const PowerupTotal = styled.div`
  position: absolute;
  bottom: 0;
  left: 47%;
  padding: 4px;
  background-color: grey;
  border-radius: 5px;
  color: white;
`;

type Props = {
  availablePowerups: { [powerupName: string]: number };
  selectedPowerupName: string;
  onPowerupSelected: (powerupName: string) => void;
};

export const PowerupSelector = ({
  availablePowerups,
  selectedPowerupName,
  onPowerupSelected,
}: Props) => {
  console.log('PLAYER POWERUPS', availablePowerups);

  return (
    <PowerupList className="margins-off">
      <PowerupSelectionItem
        selected={selectedPowerupName === 'NONE'}
        onClick={() => onPowerupSelected('NONE')}
      >
        <p>NONE</p>
      </PowerupSelectionItem>
      {Object.keys(availablePowerups).map(powerupName =>
        availablePowerups[powerupName] > 0 ? (
          <PowerupSelectionItem
            className="margins-off"
            selected={powerupName === selectedPowerupName}
            key={powerupName}
            onClick={() => onPowerupSelected(powerupName)}
          >
            <PowerupBadge powerupName={powerupName} />
            {availablePowerups[powerupName] > 1 && (
              <PowerupTotal>{availablePowerups[powerupName]}</PowerupTotal>
            )}
          </PowerupSelectionItem>
        ) : null
      )}
    </PowerupList>
  );
};
