import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { SecondaryButton } from '../../../components/SecondaryButton';
import { PowerupBadge } from '../../../components/PowerupBadge';

const PowerupList = styled.div`
  margin: 0;
  padding: 0 0 20px;
  display: flex;
`;

const PowerupSelectionItem = styled.div<{ selected: boolean }>`
  border: 5px solid ${props => (props.selected ? 'red' : 'grey')};
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
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
  return (
    <PowerupList>
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
