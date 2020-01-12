import React from 'react';
import styled from 'styled-components';
import { ReadableNumberFont } from '../../../components/ReadableNumberFont';

type Style = {
  bgColor: string;
};

const Container = styled.dl<{ style: Style }>`
  margin: 0;
  padding: 14px 18px;
  background-color: ${props => props.style.bgColor};
  color: white;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
`;

const Title = styled.dt`
  font-size: 1.1rem;
  margin: 0 10px 0 0;
  padding: 0 5px 0 0;
  text-align: center;
`;

const Value = styled.dd`
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1;
  font-size: 1.5rem;
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

type DisplayTypes = 'wins' | 'losses' | 'draws' | 'trophies';

type Props = {
  title: string;
  value: number;
  type: DisplayTypes;
};

export const SubStatItem = ({ title, value, type = 'wins' }: Props) => {
  return (
    <Container style={styles[type]}>
      <Title>{title}</Title>
      <Value>
        <ReadableNumberFont>{value}</ReadableNumberFont>
      </Value>
    </Container>
  );
};
