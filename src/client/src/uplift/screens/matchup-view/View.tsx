import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { RouteComponentProps } from '@reach/router';
import { MatchupContext } from '../../contexts/MatchupProvider';
import { TeamDetail } from './components/TeamDetail';

const MatchupsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

const TeamContainer = styled.div`
  flex: 1;
`;

const Vs = styled.div`
  padding: 0 20px;
`;

type MatchupViewProps = {
  matchupId?: string;
} & RouteComponentProps;

export default ({ matchupId }: MatchupViewProps) => {
  const {
    subscribeToMatchup,
    currentMatchup,
    clearCurrentMatchup,
  } = useContext(MatchupContext);

  useEffect(() => {
    matchupId && subscribeToMatchup(matchupId);

    return () => {
      clearCurrentMatchup();
    };
  }, []);

  return (
    <FullPageLayout pageTitle="" alignTop={true}>
      <MatchupsContainer className="margins-off">
        {!currentMatchup ? (
          <LoadingSpinner text="Loading matchup..." />
        ) : (
          <React.Fragment>
            <TeamContainer>
              <TeamDetail team={currentMatchup.teams[0]} />
            </TeamContainer>
            <Vs>vs</Vs>
            <TeamContainer>
              <TeamDetail team={currentMatchup.teams[1]} />
            </TeamContainer>
          </React.Fragment>
        )}
      </MatchupsContainer>
    </FullPageLayout>
  );
};
