import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { pulseAnimation } from '../../../../uplift/components/animations';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';

const ANIMATION_DURATION_MILLISECONDS = 500;

const Container = styled.div<{ animate: boolean; backgroundColor: string }>`
  width: 5vw;
  height: 5vw;
  font-size: 1.1rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
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
      animation: ${pulseAnimation} ${ANIMATION_DURATION_MILLISECONDS}ms;
    `}
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  text-transform: uppercase;
`;

type PointsVariant = 'player' | 'bonus' | 'game';

const styleDefinition: { [key: string]: { backgroundColor: string } } = {
  player: { backgroundColor: 'steelblue' },
  bonus: { backgroundColor: 'darkkhaki' },
  game: { backgroundColor: 'goldenrod' },
};

type Props = {
  title?: string;
  value: number;
  variant?: PointsVariant;
};

export const Points = ({ title, value, variant = 'player' }: Props) => {
  const previousPoints = useRef(value);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    if (value !== previousPoints.current) {
      previousPoints.current = value;
      setPlayAnimation(true);
      setTimeout(() => {
        setPlayAnimation(false);
      }, ANIMATION_DURATION_MILLISECONDS);
    }
  }, [value]);

  return (
    <Container
      animate={playAnimation}
      backgroundColor={styleDefinition[variant].backgroundColor}
    >
      {title && <Title>{title}</Title>}
      <ReadableNumberFont>{value}</ReadableNumberFont>{' '}
    </Container>
  );
};
