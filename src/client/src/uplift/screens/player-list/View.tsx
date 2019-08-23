import React, { useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { PlayersList } from './components/PlayersList';

const MatchupsContainer = styled.div`
  width: 95%;
  height: 90vh;
  padding: 0 20px 50px 0;
  margin: 0 auto;
  overflow-y: scroll;
`;

export default ({ }: RouteComponentProps) => {
  return (
    <PlayersProvider>
      <FullPageLayout
        pageTitle="Tournament players"
        alignTop={true}
      >
        <MatchupsContainer>
          <PlayersList />
        </MatchupsContainer>
      </FullPageLayout>
    </PlayersProvider>
  );
};
