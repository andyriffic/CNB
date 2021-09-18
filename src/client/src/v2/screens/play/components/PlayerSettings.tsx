import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SwatchesPicker } from 'react-color';
import { SecondaryButton } from '../../../../uplift/components/SecondaryButton';
import { SubHeading } from '../../../components/ui/Atoms';
import { RacingCar } from '../../racing-track/components/RacingCar';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';

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
  const { updatePlayer } = usePlayersProvider();
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
    updatePlayer(player.id, [
      ...player.tags.filter(t => !t.startsWith('rt_color')),
      `rt_color:${color}`,
    ]);
  };

  return (
    <SettingsModal>
      <CloseModal>
        <SecondaryButton onClick={() => setIsOpen(false)}>
          close
        </SecondaryButton>
      </CloseModal>
      <ModalContent>
        <SubHeading>Racing Car Colour</SubHeading>
        <div style={{}}>
          <SwatchesPicker
            color={color}
            onChange={color => setPlayerColor(color.hex)}
          />
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <RacingCar color={color} width={200} />
        </div>
      </ModalContent>
    </SettingsModal>
  );
};
