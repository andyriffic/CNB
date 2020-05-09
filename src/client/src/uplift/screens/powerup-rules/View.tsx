import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';
import { PowerupBadge } from '../../components/PowerupBadge';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
  font-size: 0.8rem;
`;

const List = styled.ul``;

const ListItem = styled.li`
  margin: 0;
  padding: 5px 0;
`;

const PowerupDescription = styled.div`
  display: flex;
`;
const PowerupIcon = styled.div``;
const PowerupText = styled.div`
  padding-left: 10px;
`;

export default ({  }: RouteComponentProps) => {
  return (
    <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
      <GameSettingsDrawer />
      <Container>
        <MainHeading>Powerups</MainHeading>
        <List>
          <ListItem>
            Optionally choose a powerup when you make your move
          </ListItem>
          <ListItem>The powerup is used only for that move</ListItem>
          <ListItem>The powerup effect is only applied if you win</ListItem>
          <ListItem>
            You'll get one random powerup when you win a trophy
          </ListItem>
        </List>
        <PowerupDescription>
          <PowerupIcon>
            <PowerupBadge powerupName="DOUBLE_POINTS" />
          </PowerupIcon>
          <PowerupText>
            Double your points for the game win (includes bonus points and
            trophy point)
          </PowerupText>
        </PowerupDescription>
        <PowerupDescription>
          <PowerupIcon>
            <PowerupBadge powerupName="POINT_STEALER" />
          </PowerupIcon>
          <PowerupText>
            Take one point from the other player (only if they have at least one
            point)
          </PowerupText>
        </PowerupDescription>
        <PowerupDescription>
          <PowerupIcon>
            <PowerupBadge powerupName="SHORT_FUSE" />
          </PowerupIcon>
          <PowerupText>
            The bomb will go off at the end of the turn!
          </PowerupText>
        </PowerupDescription>
      </Container>
    </FullPageScreenLayout>
  );
};
