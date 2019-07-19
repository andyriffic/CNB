import React from 'react';
import styled from 'styled-components';
import { Matchup } from '../../../contexts/MatchupProvider';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  border-radius: 8px;
  background-color: #f5f5f5;
  cursor: pointer;

  transition: background-color 200ms ease-in-out, color 400ms ease-in-out,
    transform 300ms ease-in-out;

  :hover {
    background-color: steelblue;
    color: white;
    transform: scale(1.05);
  }
`;

const TeamName = styled.h4`
  flex: 1;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const Vs = styled.p`
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

type MatchupSummaryViewProps = {
  matchup: Matchup;
  onSelected: () => void;
};

export default ({ matchup, onSelected }: MatchupSummaryViewProps) => {
  return (
    <Container onClick={onSelected}>
      <TeamName>{matchup.teams[0].name}</TeamName>
      <Vs>vs</Vs>
      <TeamName>{matchup.teams[1].name}</TeamName>
    </Container>
  );
};
