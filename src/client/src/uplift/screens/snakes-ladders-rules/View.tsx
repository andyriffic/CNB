import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

const List = styled.ul``;

const ListItem = styled.li`
  margin: 0;
  padding: 5px 0;
`;

export default ({  }: RouteComponentProps) => {
  return (
    <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
      <GameSettingsDrawer />
      <Container>
        <MainHeading>Snakes and Ladders Rules</MainHeading>
        <List>
          <ListItem>
            Each day 2 players will play{' '}
            <Link to="/">'Timebomb' Jungle theme</Link>
            <List>
              <ListItem>
                For each game won, that player receives 1 game move
              </ListItem>
              <ListItem>
                For each trophy won, that player receives 1 game move
              </ListItem>
              <ListItem>For each draw, no players receive a move</ListItem>
            </List>
          </ListItem>
          <ListItem>
            When the Timebomb has exploded, players will make their moves on the{' '}
            <Link to="/snakes-and-ladders">Snakes and Ladders board</Link>
          </ListItem>
        </List>
      </Container>
    </FullPageScreenLayout>
  );
};
