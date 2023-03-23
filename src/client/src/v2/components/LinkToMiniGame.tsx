import React from 'react';
import styled from 'styled-components';
import { FancyLink } from '../../components/FancyLink';
import { jackInTheBoxAnimation } from '../../uplift/components/animations';

const Container = styled.div`
  text-align: center;
  cursor: pointer;
  animation: ${jackInTheBoxAnimation} 2000ms linear 5000ms both;
`;

export const LinkToMiniGame = () => {
  return (
    <Container>
      <FancyLink
        onClick={() =>
          (window.location.href =
            'https://test.finx-rocks.com/whos-that?continueUrl=http://cnb.finx-rocks.com/donkey-kong')
        }
      >
        🥳 Go to Mini Game 🥳
      </FancyLink>
    </Container>
  );
};
