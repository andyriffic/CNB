import React, { useContext } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { MatchupContext } from '../../contexts/MatchupProvider';
import { MatchupSummaryView } from '../components/matchup-summary';
import { RouteComponentProps } from '@reach/router';

const MatchupsContainer = styled.div`
  width: 80%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({ navigate }: RouteComponentProps) => {
  const { allMatchups, loadingAllMatchups } = useContext(MatchupContext);
  return (
    <FullPageLayout pageTitle="Matchup Lobby" alignTop={true}>
      <MatchupsContainer>
        {loadingAllMatchups ? (
          <LoadingSpinner text="loading matchups..." />
        ) : (
          allMatchups.map(matchup => (
            <MatchupSummaryView
              key={matchup.id}
              matchup={matchup}
              onSelected={() => navigate && navigate(`/matchup/${matchup.id}?feature=uplift`)}
            />
          ))
        )}
      </MatchupsContainer>
    </FullPageLayout>
  );
};
