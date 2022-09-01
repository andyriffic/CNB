import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { FinalEpicMatchup } from '../../components/FinalEpicMatchup';
import { SubHeading } from '../../components/ui/Atoms';
import { GameScreen } from '../../components/ui/GameScreen';

const Container = styled.div`
  margin: 0 auto;
  background-size: contain;
  position: relative;
  padding: 40px 0;
  height: 100%;
`;

const MatchupContainer = styled.div`
  margin-bottom: 20px;
  width: 30%;
`;

const View = () => {
  return (
    <GameScreen scrollable={false}>
      <Container>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <MatchupContainer>
            <SubHeading>1st + 2nd</SubHeading>
            <FinalEpicMatchup
              placePositions={[1, 2]}
              placingKey="rt_finish"
              winnerKey="mt_final"
            />
          </MatchupContainer>
        </div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <MatchupContainer>
            <SubHeading>3rd + 4th</SubHeading>
            <FinalEpicMatchup
              placePositions={[3, 4]}
              placingKey="rt_finish"
              winnerKey="mt_semi_final"
              winnerPosition={1}
            />
          </MatchupContainer>
          <MatchupContainer>
            <SubHeading>5th + 6th</SubHeading>

            <FinalEpicMatchup
              placePositions={[5, 6]}
              placingKey="rt_finish"
              winnerKey="mt_semi_final"
              winnerPosition={2}
            />
          </MatchupContainer>
          <MatchupContainer>
            <SubHeading>Semi final</SubHeading>
            <FinalEpicMatchup
              placePositions={[1, 2]}
              placingKey="mt_semi_final"
              winnerKey="mt_final"
              winnerPosition={3}
            />
          </MatchupContainer>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <MatchupContainer>
            <SubHeading>Grand final</SubHeading>
            <FinalEpicMatchup
              placePositions={[1, 2]}
              placingKey="mt_final"
              winnerKey="mt_winner"
            />
          </MatchupContainer>
        </div>
      </Container>
    </GameScreen>
  );
};

export default View;
