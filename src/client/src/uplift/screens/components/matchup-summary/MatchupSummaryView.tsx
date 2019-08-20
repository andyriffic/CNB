import React from 'react';
import styled from 'styled-components';
import { Matchup } from '../../../contexts/MatchupProvider';
import { GameTheme } from '../../../contexts/ThemeProvider';
import { TeamSummaryView } from './TeamSummaryView';

const Container = styled.div<{ theme: GameTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  background-color: #E5E4E9;
  padding: 20px;
  cursor: pointer;

  transition: background-color 200ms ease-in-out, color 400ms ease-in-out,
    transform 300ms ease-in-out;

  :hover {
    background-color: #1d1145;
    color: white;
    transform: scale(1.05);
  }
`;

const Vs = styled.p`
  font-size: 2rem;
  margin: 0;
  padding: 0 40px;
  color: #0db4b9;
`;

type MatchupSummaryViewProps = {
  matchup: Matchup;
  onSelected: () => void;
};

export default ({ matchup, onSelected }: MatchupSummaryViewProps) => {
  return (
    <Container onClick={onSelected} className="margins-off">
      <TeamSummaryView team={matchup.teams[0]} />
      <Vs>vs</Vs>
      <TeamSummaryView team={matchup.teams[1]} />
    </Container>
  );
};
