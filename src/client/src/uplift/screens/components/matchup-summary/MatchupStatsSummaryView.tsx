import React from 'react';
import styled from 'styled-components';
import { Team } from '../../../contexts/MatchupProvider';
import { GameTheme } from '../../../contexts/ThemeProvider';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';

const Container = styled.div<{ theme: GameTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  background-color: #e5e4e9;
  padding: 10px 20px;
`;

const TrophyContainer = styled.div`
  font-size: 1.3rem;
  margin: 0;
  color: #0db4b9;
`;

type MatchupStatsSummaryProps = {
  teams: [Team, Team];
};

export const MatchupStatsSummaryView = ({
  teams,
}: MatchupStatsSummaryProps) => {
  return (
    <Container className="margins-off">
      <TrophyContainer>
        <ReadableNumberFont>{teams[0].trophies}</ReadableNumberFont> 🏆{' '}
        <ReadableNumberFont>{teams[1].trophies}</ReadableNumberFont>
      </TrophyContainer>
    </Container>
  );
};
