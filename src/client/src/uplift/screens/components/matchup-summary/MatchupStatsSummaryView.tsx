import React from 'react';
import styled from 'styled-components';
import { Team } from '../../../contexts/MatchupProvider';
import { GameTheme } from '../../../contexts/ThemeProvider';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';

const Container = styled.div<{ theme: GameTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: #e5e4e9;
  padding: 10px 20px;
`;

const TrophyContainer = styled.div`
  font-size: 1.3rem;
  margin: 0;
`;

const Point = styled.span<{ isLeading: boolean }>`
  color: ${props => (props.isLeading ? '#0db4b9' : '#7BD6D8')};
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
        <Point isLeading={teams[0].trophies > teams[1].trophies}>
          <ReadableNumberFont>{teams[0].trophies}</ReadableNumberFont>
        </Point>{' '}
        🏆{' '}
        <Point isLeading={teams[1].trophies > teams[0].trophies}>
          <ReadableNumberFont>{teams[1].trophies}</ReadableNumberFont>
        </Point>
      </TrophyContainer>
    </Container>
  );
};
