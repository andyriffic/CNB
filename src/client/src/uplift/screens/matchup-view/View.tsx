import React, { useContext } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { RouteComponentProps } from '@reach/router';

const MatchupsContainer = styled.div`
  width: 80%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({  }: RouteComponentProps) => {
  return (
    <FullPageLayout pageTitle="Matchup Lobby" alignTop={true}>
      <MatchupsContainer>
        <LoadingSpinner text="Load matchup here..." />
      </MatchupsContainer>
    </FullPageLayout>
  );
};
