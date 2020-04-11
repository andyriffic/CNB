import React from 'react';
import styled from 'styled-components';
import { Player } from '../contexts/PlayersProvider';
import { Panel, SubHeading, Stacked } from './ui/Atoms';
import { PlayerAvatar } from './PlayerAvatar';
import { SecondaryButton } from './SecondaryButton';

type Props = {
  player: Player;
  // status: 'waiting' | 'selected';
  // onSelectNewPlayer: () => void;
};

const Container = styled(Panel)`
  width: 25%;
`;

export const PlayerSelect = ({ player }: Props) => {
  return (
    <Container>
      <Stacked>
        <SubHeading>{player.name}</SubHeading>
        <PlayerAvatar player={player} />
        <SecondaryButton>Change</SecondaryButton>
      </Stacked>
    </Container>
  );
};
