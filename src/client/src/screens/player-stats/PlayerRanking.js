import React from 'react';
import styled from 'styled-components';
import { SubStatItem } from './SubStatItem';

const Container = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  align-items: center;

  opacity: 0.8;
  transition: opacity 500ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Name = styled.div`
  font-size: 0.7rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const PlayerRanking = ({ playerRanking }) => {
  return (
    <Container>
      <Name>{playerRanking.player}</Name>
      <Stats>
        <SubStatItem title="Wins" value={playerRanking.times_won} />
        <SubStatItem
          type="losses"
          title="Losses"
          value={playerRanking.times_lost}
        />
        <SubStatItem
          type="draws"
          title="Draws"
          value={playerRanking.times_drawn}
        />
      </Stats>
    </Container>
  );
};
