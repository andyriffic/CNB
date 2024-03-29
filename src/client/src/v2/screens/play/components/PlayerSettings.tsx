import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SwatchesPicker } from 'react-color';
import { SecondaryButton } from '../../../../uplift/components/SecondaryButton';
import { SubHeading } from '../../../components/ui/Atoms';

import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';
import { SportsCar } from '../../racing-track/components/racing-cars/SportsCar';
import { PacManGhost } from '../../racing-track/components/racing-cars/PacManGhost';

const SettingsLauncher = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const SettingsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: steelblue;
  padding: 10px;
`;

const ModalContent = styled.div`
  margin-top: 40px;
`;

const CloseModal = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;

type Props = {
  player: Player;
};

export const PlayerSettings = ({ player }: Props): JSX.Element => {
  const { safeUpdatePlayerStringAttribute } = usePlayersProvider();
  const [isOpen, setIsOpen] = useState(false);
  const color = useMemo(
    () => getPlayerAttributeValue(player.tags, 'rt_color', '#ff0000'),
    [player]
  );

  if (!isOpen) {
    return (
      <SettingsLauncher>
        <SecondaryButton onClick={() => setIsOpen(true)}>
          Settings
        </SecondaryButton>
      </SettingsLauncher>
    );
  }

  const setPlayerColor = (color: string) => {
    safeUpdatePlayerStringAttribute(player.id, 'rt_color', color);
  };

  return (
    <SettingsModal>
      <CloseModal>
        <SecondaryButton onClick={() => setIsOpen(false)}>
          close
        </SecondaryButton>
      </CloseModal>
      <ModalContent>
        <SubHeading>Custom Colour</SubHeading>
        <div style={{}}>
          <SwatchesPicker
            color={color}
            onChange={color => setPlayerColor(color.hex)}
          />
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          {/* <SportsCar color={color} width={200} /> */}
          <PacManGhost color={color} width={200} />
        </div>
      </ModalContent>
    </SettingsModal>
  );
};
