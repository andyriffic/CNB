/* @flow */
import React from 'react';

import PlayerStatus from '../player-status';
import PlayerScore from '../player-score';
import { PlayerSpectatorContainer, PlayerSpectatorSection, Page, PageHeader, PageBody } from '../../../styled';

type Props = {
  player1: Object,
  player2: Object,
}

const View = ( {player1, player2 }: Props ) => {
  return (
    <Page>
      <PageHeader>Waiting 等候</PageHeader>
      <PageBody>
        <PlayerSpectatorContainer>
          <PlayerSpectatorSection>
            <PlayerStatus { ...player1 } animationDelay={0} />
            <PlayerScore playerKey={player1.name} />
          </PlayerSpectatorSection>
          <PlayerSpectatorSection>
            <PlayerStatus { ...player2 } animationDelay={.5} />
            <PlayerScore playerKey={player2.name} />
          </PlayerSpectatorSection>    
        </PlayerSpectatorContainer>
      </PageBody>
    </Page>
  );
}

export default View;
