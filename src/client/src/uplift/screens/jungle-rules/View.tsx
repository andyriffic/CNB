import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

export default ({  }: RouteComponentProps) => {
  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
        <GameSettingsDrawer />
        <Container>
          <MainHeading>Leaderboard 2020</MainHeading>
        </Container>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
