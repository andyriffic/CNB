import React from 'react';
import styled from 'styled-components';
import { Player } from '../contexts/PlayersProvider';
import { Panel, SubHeading, Stacked } from './ui/Atoms';
import { PlayerAvatar } from './PlayerAvatar';
import { SecondaryButton } from './SecondaryButton';
import { Button } from './ui/buttons';

type Props = {
  player: Player;
  // status: 'waiting' | 'selected';
  // onSelectNewPlayer: () => void;
};

const Container = styled.div`
  width: 25%;
`;

export const PlayerSelect = ({ player }: Props) => {
  return (
    <Container>
      <Stacked>
        <Panel>
          <Stacked>
            <SubHeading>{player.name}</SubHeading>
            <PlayerAvatar player={player} />
          </Stacked>
        </Panel>
        <Button>Change</Button>
      </Stacked>
    </Container>
  );
};
