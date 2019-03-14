import React from 'react';
import styled from 'styled-components';
import RainbowText from '../rainbow-text';

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const View = ({ goal }) => {
  return (
    <Container>
      <RainbowText>{goal} points = 🏆</RainbowText>
    </Container>
  );
};

export default View;
