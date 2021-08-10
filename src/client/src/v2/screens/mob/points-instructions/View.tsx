import React from 'react';
import styled from 'styled-components';
import { SubHeading } from '../../../components/ui/Atoms';
import { GameScreen } from '../../../components/ui/GameScreen';

import mobWinsMultiImage from './assets/mob-points-multi-mob-wins.png';
import mobWinsSingleImage from './assets/mob-points-single-mob-wins.png';
import playerWinsImage from './assets/mob-points-player-wins.png';

const Container = styled.div`
  margin: 0 auto 50px auto;
`;

const Image = styled.img`
  display: block;
`;

export default () => {
  return (
    <GameScreen scrollable={true}>
      <Container>
        <SubHeading style={{ marginTop: '20px', textAlign: 'left' }}>
          Player wins
        </SubHeading>
        <Image src={playerWinsImage} alt="" />

        <SubHeading style={{ marginTop: '20px', textAlign: 'left' }}>
          Multiple Mob Players win
        </SubHeading>
        <Image src={mobWinsMultiImage} alt="" />

        <SubHeading style={{ marginTop: '20px', textAlign: 'left' }}>
          Single Mob Player win
        </SubHeading>
        <Image src={mobWinsSingleImage} alt="" />
      </Container>
    </GameScreen>
  );
};
