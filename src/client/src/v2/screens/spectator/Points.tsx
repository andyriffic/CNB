import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { pulseAnimation } from '../../../uplift/components/animations';
import { ReadableNumberFont } from '../../../components/ReadableNumberFont';

const ANIMATION_DURATION_MILLISECONDS = 500;

const Container = styled.div<{ animate: boolean; backgroundVariant: string }>`
  width: 5vw;
  height: 5vw;
  font-size: 1.1rem;
  background-color: ${({ theme, backgroundVariant }) =>
    theme.color.points[backgroundVariant]};
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

const styleDefinition: { [key: string]: { backgroundStyle: string } } = {
  player: { backgroundStyle: 'backgroundVariant01' },
  bonus: { backgroundStyle: 'backgroundVariant02' },
  game: { backgroundStyle: 'backgroundVariant03' },
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
      backgroundVariant={styleDefinition[variant].backgroundStyle}
    >
      {title && <Title>{title}</Title>}
      <ReadableNumberFont>{value}</ReadableNumberFont>{' '}
    </Container>
  );
};
