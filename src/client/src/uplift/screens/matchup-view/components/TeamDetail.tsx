import React from 'react';
import styled from 'styled-components';
import { Team } from '../../../contexts/MatchupProvider';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import { DynamicUpdatingPoints } from '../../../components/dynamic-updating-points';
import { TrophyProgressIndicator } from '../../components/trophy-progress-indicator';

const Container = styled.div`
  border: 2px solid black;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`;

const TeamName = styled.h4`
  margin: 0;
  text-align: center;
  background-color: ${props => props.theme.headerBackgroundColor};
`;

const TeamPoints = styled.div`
  margin: 0;
  font-size: 2rem;
  text-align: center;
  background-color: #f5f5f5;
`;

export const TeamDetail = ({
  team,
  reverse,
  trophyGoal,
  showPointDiff,
}: {
  team: Team;
  reverse?: boolean;
  trophyGoal: number;
  showPointDiff: boolean;
}) => {
  return (
    <div className="margins-off">
      <TrophyProgressIndicator
        points={team.points}
        goal={trophyGoal}
        reverse={reverse}
      />
      <Container>
        <TeamName>{team.name}</TeamName>
        <TeamPoints>
          <DynamicUpdatingPoints
            value={team.points}
            showPointDiff={showPointDiff}
          />
        </TeamPoints>
      </Container>
    </div>
  );
};
