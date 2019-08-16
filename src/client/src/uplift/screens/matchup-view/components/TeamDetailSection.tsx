import React from 'react';
import styled from 'styled-components';
import { Team, Matchup, GAME_STATUS } from '../../../contexts/MatchupProvider';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import { DynamicUpdatingPoints } from '../../../components/dynamic-updating-points';
import { TrophyProgressIndicator } from '../../components/trophy-progress-indicator';
import { TeamDetailItem } from './TeamDetailItem';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamContainer = styled.div`
  flex: 1;
`;

const Vs = styled.div`
  padding: 0 20px;
`;

export const TeamDetailsSection = ({
  teams,
  matchup,
}: {
  teams: [Team, Team];
  matchup: Matchup;
}) => {
  return (
    <Container className="margins-off">
      <TeamContainer>
        <TeamDetailItem
          team={teams && teams[0]}
          trophyGoal={matchup.trophyGoal}
          showPointDiff={
            !!matchup.gameInProgress &&
            matchup.gameInProgress.status === GAME_STATUS.Finished
          }
        />
      </TeamContainer>
      <Vs>vs</Vs>
      <TeamContainer>
        <TeamDetailItem
          team={teams && teams[1]}
          reverse
          trophyGoal={matchup.trophyGoal}
          showPointDiff={
            !!matchup.gameInProgress &&
            matchup.gameInProgress.status === GAME_STATUS.Finished
          }
        />
      </TeamContainer>
    </Container>
  );
};
