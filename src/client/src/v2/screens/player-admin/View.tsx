import React from 'react';
import styled from 'styled-components';
import { PlayerEditList } from './PlayerEditList';
import { PlayerAdd } from './PlayerAdd';
import { GameScreen } from '../../components/ui/GameScreen';
import { PlayerMaintenance } from './PlayerMaintenance';

const Container = styled.div`
  width: 1024;
  margin: 0 auto;
  display: flex;
`;

export default () => {
  return (
    <GameScreen scrollable>
      <Container className="margins-off">
        <div>
          <PlayerAdd />
          <PlayerMaintenance />
        </div>
        <PlayerEditList />
      </Container>
    </GameScreen>
  );
};
