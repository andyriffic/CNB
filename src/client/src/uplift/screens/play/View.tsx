import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({  }: RouteComponentProps) => {
  return (
    <FullPageLayout pageTitle="" alignTop={true}>
      <MatchupsContainer>
        <h1>Player</h1>
      </MatchupsContainer>
    </FullPageLayout>
  );
};
