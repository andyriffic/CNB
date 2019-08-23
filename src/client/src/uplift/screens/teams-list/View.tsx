import React, { useState } from 'react';
import styled from 'styled-components';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { RouteComponentProps } from '@reach/router';
import { TeamsProvider } from '../../contexts/TeamsProvider';
import { TeamsList } from './components/TeamsList';

const Container = styled.div`
`;

export default ({ }: RouteComponentProps) => {
  return (
    <TeamsProvider>
      <FullPageScreenLayout
        title="Teams"
        alignTop={true}
        scrollable
      >
        <Container>
          <TeamsList />
        </Container>
      </FullPageScreenLayout>
    </TeamsProvider>
  );
};
