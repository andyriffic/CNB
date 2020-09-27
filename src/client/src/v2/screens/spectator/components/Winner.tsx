import React, { useEffect } from 'react';
import styled from 'styled-components';
import winCat from './assets/win-cat.gif';
import { RainbowText } from '../../../../uplift/components/RainbowText';
import { shakeAnimationLeft } from '../../../../uplift/components/animations';

const Container = styled.div`
  width: 7vw;
  height: 7vw;
  background-color: transparent;
  /* animation: ${shakeAnimationLeft} 500ms infinite; */
`;

const WinImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const Winner = () => {
  return (
    <Container>
      <RainbowText>WINNER!</RainbowText>
      {/* <WinImage src={winCat} /> */}
    </Container>
  );
};
