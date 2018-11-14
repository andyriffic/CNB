/* @flow */
import React from 'react';
import { PlayerSpectatorContainer, PlayerSpectatorSection, Button, Page, PageHeader, PageBody } from '../../../styled';

import PlayerStatus from '../player-status';

type Props = {
  player1: Object,
  player2: Object,
  playGame: () => void,
}

const View = ( {player1, player2, playGame }: Props ) => {
  return (
    <Page>
      <PageHeader>Ready 准备</PageHeader>
      <PageBody>
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
      </PageBody>
    </Page>
  );
}

export default View;
