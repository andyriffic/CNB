/* @flow */
import React from 'react';
import styled from 'styled-components';
import {
  PlayerSpectatorContainer,
  PlayerSpectatorSection,
  Button,
} from '../../../styled';

import PlayerScore from '../player-score';
import PlayerStatus from '../player-status';
import PageLayout from '../../../../components/page-layout/FullPage';

type Props = {
  player1: Object,
  player2: Object,
  playGame: () => void,
};

const BonusPointSection = styled.div`
  text-align: center;
`;

const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ({ player1, player2, playGame }: Props) => {
  return (
    <PageLayout pageTitle="Ready 准备">
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <PlayerStatus {...player1} />
          <PlayerScore playerKey={player1.name} />
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <Button onClick={playGame}>PLAY 玩</Button>
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <PlayerStatus {...player2} />
          <PlayerScore playerKey={player2.name} />
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
      <BonusPointSection>
        <BonusHeading>BONUS 獎金</BonusHeading>
        <PlayerScore playerKey={'BONUS'} />
      </BonusPointSection>
    </PageLayout>
  );
};

export default View;
