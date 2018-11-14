/* @flow */
import React from 'react';

import PlayerStatus from '../player-status';
import { DesktopPageHeader, PlayerSpectatorContainer, PlayerSpectatorSection } from '../../../styled';

type Props = {
  player1: Object,
  player2: Object,
}

const View = ( {player1, player2 }: Props ) => {
  return (
    <React.Fragment>
      <DesktopPageHeader>Waiting 等候</DesktopPageHeader>
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <PlayerStatus { ...player1 } />
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <PlayerStatus { ...player2 } />
        </PlayerSpectatorSection>    
      </PlayerSpectatorContainer>
    </React.Fragment>
  );
}

export default View;
