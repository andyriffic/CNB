import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../../components/layouts/FullPageScreenLayout';
import { PlayerEditList } from './PlayerEditList';
import { PlayerAdd } from './PlayerAdd';

const Container = styled.div`
  width: 1024;
  margin: 0 auto;
  display: flex;
`;

export default ({ navigate }: RouteComponentProps) => {
  return (
    <FullPageScreenLayout title="Player Admin" alignTop={true} scrollable>
      <Container className="margins-off">
        <PlayerAdd />
        <PlayerEditList />
      </Container>
    </FullPageScreenLayout>
  );
};
