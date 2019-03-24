import React from 'react';
import styled from 'styled-components';
import RainbowText from '../rainbow-text';
import { ReadableNumberFont } from '../ReadableNumberFont';

const Container = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
`;

const View = ({ goal }) => {
  return (
    <Container>
      First to&nbsp;
      <RainbowText>
        <ReadableNumberFont>{goal}</ReadableNumberFont>
      </RainbowText>
      &nbsp;gets a 🏆
    </Container>
  );
};

export default View;
