import React from 'react';
import styled from 'styled-components';
import { Matchup } from '../../../contexts/MatchupProvider';
import { GameTheme } from '../../../contexts/ThemeProvider';
import { TeamSummaryView } from './TeamSummaryView';
import { MatchupStatsSummaryView } from './MatchupStatsSummaryView';

const Container = styled.div<{ theme: GameTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  background-color: #e5e4e9;
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

type MatchupSummaryViewProps = {
  matchup: Matchup;
  onSelected: () => void;
};

export default ({ matchup, onSelected }: MatchupSummaryViewProps) => {
  return (
    <Container onClick={onSelected} className="margins-off">
      <TeamSummaryView team={matchup.teams[0]} />
      <MatchupStatsSummaryView teams={matchup.teams} />
      <TeamSummaryView team={matchup.teams[1]} />
    </Container>
  );
};
