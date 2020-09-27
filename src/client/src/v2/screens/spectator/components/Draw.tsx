import React, { useEffect } from 'react';
import styled from 'styled-components';
import drawCat from './assets/draw-cat.gif';
import { RainbowText } from '../../../../uplift/components/RainbowText';
import { shakeAnimationLeft } from '../../../../uplift/components/animations';

const Container = styled.div`
  width: 8vw;
  height: 8vw;
  background-color: transparent;
  /* animation: ${shakeAnimationLeft} 500ms infinite; */
`;

const WinImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const Draw = () => {
  return (
    <Container>
      <RainbowText>Draw!</RainbowText>
      {/* <WinImage src={drawCat} /> */}
    </Container>
  );
};
