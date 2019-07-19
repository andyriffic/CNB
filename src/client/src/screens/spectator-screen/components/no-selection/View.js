import React from 'react';
import styled, { keyframes } from 'styled-components';

import WaitingIcon from '../../../../components/icons/loading';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Container = styled.div`
  opacity: 0;
  align-self: center;
  animation: ${fadeIn} 1s linear ${props => props.animationDelay}s 1 forwards;
  width: 100%;
  height: 100%;
`;

const View = ({ animationDelay }) => {
  return (
    <Container animationDelay={animationDelay}>
      <WaitingIcon animationDelay={animationDelay} />
    </Container>
  );
};

export default View;
