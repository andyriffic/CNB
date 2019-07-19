import React from 'react';
import styled, { keyframes } from 'styled-components';

const extremeFadeAndScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(.5, .5);
    }
    60% {
        opacity: 1;
        transform: scale(1.3, 1.3);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const DrawHeading = styled.h2`
  //opacity: 0;
  //animation: ${extremeFadeAndScale} 1s linear 1s 1 forwards;
  text-align: center;
  font-size: 1.25rem;
`;

const View = () => {
  return (
    <React.Fragment>
      <DrawHeading>
        It's a draw! <br />
        這是一個平局
      </DrawHeading>
    </React.Fragment>
  );
};

export default View;
