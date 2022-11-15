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
            '/whos-that-supersquad-member?continueUrl=/pac-man')
        }
      >
        🥳 Go to Mini Game 🥳
      </FancyLink>
    </Container>
  );
};
