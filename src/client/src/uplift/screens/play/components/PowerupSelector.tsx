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
  margin-right: 5px;
`;

const PowerupScale = styled.div`
  /* transform: scale(0.6); */
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
            selected={powerupName === selectedPowerupName}
            key={powerupName}
            onClick={() => onPowerupSelected(powerupName)}
          >
            <PowerupBadge
              powerupName={powerupName}
              total={availablePowerups[powerupName]}
            />
          </PowerupSelectionItem>
        ) : null
      )}
    </PowerupList>
  );
};
