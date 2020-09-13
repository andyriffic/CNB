import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { pulseAnimation } from '../../../uplift/components/animations';
import { ReadableNumberFont } from '../../../components/ReadableNumberFont';

const Container = styled.div`
  width: 5vw;
  height: 5vw;
  background-color: red;
  font-size: 1.1rem;
  background: goldenrod;
  border-radius: 50%;
  color: #fff;
  padding: 10% 20%;
  border: 3px solid #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  /* animation: ${pulseAnimation} 3s infinite; */
`;

const Title = styled.div`
  font-size: 0.4rem;
  text-transform: uppercase;
`;

type Props = {
  title?: string;
  value: number;
};

export const Points = ({ title, value }: Props) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <ReadableNumberFont>{value}</ReadableNumberFont>{' '}
    </Container>
  );
};
