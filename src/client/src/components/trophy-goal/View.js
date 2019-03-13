import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const View = ({ goal }) => {
  return <Container>{goal} points = 🏆</Container>;
};

export default View;
