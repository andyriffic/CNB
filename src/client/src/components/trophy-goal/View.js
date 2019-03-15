import React from 'react';
import styled from 'styled-components';
import RainbowText from '../rainbow-text';
import { ReadableNumberFont } from '../ReadableNumberFont';

const Container = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
`;

const View = ({ goal }) => {
  return (
    <Container>
      <RainbowText>
        <ReadableNumberFont>{goal}</ReadableNumberFont> 🏆
      </RainbowText>
    </Container>
  );
};

export default View;
