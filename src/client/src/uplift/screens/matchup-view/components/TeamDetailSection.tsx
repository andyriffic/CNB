import React from 'react';
import styled from 'styled-components';
import { Team, Matchup, GAME_STATUS } from '../../../contexts/MatchupProvider';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';
import { DynamicUpdatingPoints } from '../../../components/dynamic-updating-points';
import { TrophyProgressIndicator } from '../../components/trophy-progress-indicator';
import { TeamDetailItem } from './TeamDetailItem';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TeamContainer = styled.div`
  flex: 1;
`;

const MiddleSection = styled.div``;

const TrophyGoal = styled.div`
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.25;
  padding-top: 10px;
  text-transform: uppercase;
`;

const Vs = styled.div`
  padding: 0 20px;
`;

export const TeamDetailsSection = ({
  teams,
  matchup,
  playMode,
}: {
  teams: [Team, Team];
  matchup: Matchup;
  playMode: string;
}) => {
  return (
    <Container className="margins-off">
      <TeamContainer>
        <TeamDetailItem
          playMode={playMode}
          team={teams && teams[0]}
          trophyGoal={matchup.trophyGoal}
          showPointDiff={
            !!matchup.gameInProgress &&
            matchup.gameInProgress.status === GAME_STATUS.Finished
          }
        />
      </TeamContainer>
      <MiddleSection>
        {playMode === 'Standard' && (
          <TrophyGoal>
            Goal
            <br />
            <ReadableNumberFont>{matchup.trophyGoal}</ReadableNumberFont>
          </TrophyGoal>
        )}
        <Vs>vs</Vs>
      </MiddleSection>
      <TeamContainer>
        <TeamDetailItem
          playMode={playMode}
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
