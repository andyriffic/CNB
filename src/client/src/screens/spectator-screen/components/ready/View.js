/* @flow */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayerSpectatorContainer, PlayerSpectatorSection, Button, Page, PageHeader, PageBody } from '../../../styled';

import PlayerScore from '../player-score';
import PlayerStatus from '../player-status';
import GameThemeContext from '../../../../contexts/GameThemeContext';

type Props = {
  player1: Object,
  player2: Object,
  playGame: () => void,
}

const BonusPointSection = styled.div``;
const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ( {player1, player2, playGame }: Props ) => {
  const theme = useContext(GameThemeContext);
  return (
    <Page { ...theme.style }>
      <PageHeader { ...theme.style }>Ready 准备</PageHeader>
      <PageBody column={ true }>
        <PlayerSpectatorContainer>
          <PlayerSpectatorSection>
            <PlayerStatus { ...player1 } />
            <PlayerScore playerKey={player1.name} />
          </PlayerSpectatorSection>
          <PlayerSpectatorSection>
            <Button onClick={playGame}>
              PLAY 玩
            </Button>
          </PlayerSpectatorSection>
          <PlayerSpectatorSection>
            <PlayerStatus { ...player2 } />
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
