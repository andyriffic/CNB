/* @flow */
import React, { useContext } from 'react';
import styled from 'styled-components';

import PlayerStatus from '../player-status';
import PlayerScore from '../player-score';
import { PlayerSpectatorContainer, PlayerSpectatorSection, Page, PageHeader, PageBody } from '../../../styled';
import GameThemeContext from '../../../../contexts/GameThemeContext';

type Props = {
  player1: Object,
  player2: Object,
}

const BonusPointSection = styled.div``;
const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ( {player1, player2 }: Props ) => {
  const theme = useContext(GameThemeContext);
  return (
    <Page { ...theme.style }>
      <PageHeader { ...theme.style }>Waiting 等候</PageHeader>
      <PageBody column={ true }>
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
        <BonusPointSection>
          <BonusHeading>BONUS 獎金</BonusHeading>
          <PlayerScore playerKey={'BONUS'}/>
        </BonusPointSection>
      </PageBody>
    </Page>
  );
}

export default View;
