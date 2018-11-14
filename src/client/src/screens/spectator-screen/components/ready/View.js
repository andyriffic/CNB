/* @flow */
import React from 'react';
import { DesktopPageHeader, PlayerSpectatorContainer, PlayerSpectatorSection, Button } from '../../../styled';

import PlayerStatus from '../player-status';

type Props = {
  player1: Object,
  player2: Object,
  playGame: () => void,
}

const View = ( {player1, player2, playGame }: Props ) => {
  return (
    <React.Fragment>
      <DesktopPageHeader>Ready 准备</DesktopPageHeader>
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <PlayerStatus { ...player1 } />
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <Button onClick={playGame}>
            PLAY 玩
          </Button>
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <PlayerStatus { ...player2 } />
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
    </React.Fragment>
  );
}

export default View;
