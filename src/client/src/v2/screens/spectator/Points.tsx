import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { pulseAnimation } from '../../../uplift/components/animations';
import { ReadableNumberFont } from '../../../components/ReadableNumberFont';

const Container = styled.div<{ animate: boolean }>`
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
  ${({ animate }) =>
    animate &&
    css`
      animation: ${pulseAnimation} 500ms;
    `}
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
  const previousPoints = useRef(value);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    if (value !== previousPoints.current) {
      previousPoints.current = value;
      setPlayAnimation(true);
    }
  }, [value]);

  return (
    <Container animate={playAnimation}>
      {title && <Title>{title}</Title>}
      <ReadableNumberFont>{value}</ReadableNumberFont>{' '}
    </Container>
  );
};
