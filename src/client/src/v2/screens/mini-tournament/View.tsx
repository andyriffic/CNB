import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { FinalEpicMatchup } from '../../components/FinalEpicMatchup';
import { GameScreen } from '../../components/ui/GameScreen';

const Container = styled.div`
  margin: 0 auto;
  background-size: contain;
  position: relative;
  padding: 40px 0;
  height: 100%;
`;

const View = () => {
  return (
    <GameScreen scrollable={false}>
      <Container>
        <FinalEpicMatchup placingKey="rt_finish" winnerKey="rt_final_round_1" />
      </Container>
    </GameScreen>
  );
};

export default View;
