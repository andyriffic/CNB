import React from 'react';
import styled from 'styled-components';
import { ReadableNumberFont } from '../../components/ReadableNumberFont';

const Container = styled.dl`
  margin: 0;
  padding: 4px 8px;
  background-color: ${props => props.style.bgColor};
  color: white;
  border-radius: 7px;
  display: flex;
  align-items: center;
`;

const Title = styled.dt`
  font-size: 0.4rem;
  margin: 0;
  padding: 0 5px 0 0;
  text-align: center;
`;

const Value = styled.dd`
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1;
`;

const styles = {
  wins: {
    bgColor: '#5cb85c',
  },
  losses: {
    bgColor: '#DF562C',
  },
  draws: {
    bgColor: '#E99D44',
  },
  trophies: {
    bgColor: '#17a2b8',
  },
};

export const SubStatItem = ({ title, value, type = 'wins' }) => {
  return (
    <Container style={styles[type]}>
      <Title>{title}</Title>
      <Value>
        <ReadableNumberFont>{value}</ReadableNumberFont>
      </Value>
    </Container>
  );
};
