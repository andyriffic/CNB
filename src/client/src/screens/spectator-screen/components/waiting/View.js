/* @flow */
import React from "react";
import styled from "styled-components";

import PlayerStatus from "../player-status";
import PlayerScore from "../player-score";
import {
  PlayerSpectatorContainer,
  PlayerSpectatorSection
} from "../../../styled";
import PageLayout from "../../../../components/page-layout/FullPage";

type Props = {
  player1: Object,
  player2: Object
};

const BonusPointSection = styled.div`
  text-align: center;
`;
const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ({ player1, player2 }: Props) => {
  return (
    <PageLayout pageTitle="Waiting 等候">
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <PlayerStatus {...player1} animationDelay={0} />
          <PlayerScore playerKey={player1.name} />
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <PlayerStatus {...player2} animationDelay={0.5} />
          <PlayerScore playerKey={player2.name} />
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
      <BonusPointSection>
        <BonusHeading>BONUS 獎金</BonusHeading>
        <PlayerScore playerKey={"BONUS"} />
      </BonusPointSection>
    </PageLayout>
  );
};

export default View;
