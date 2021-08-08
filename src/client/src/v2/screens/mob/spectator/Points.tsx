import React from 'react';
import styled, { css } from 'styled-components';
import {
  outOfWormholeAnimation,
  slideInUpAnimation,
} from '../../../../uplift/components/animations';

const Container = styled.div`
  /* opacity: 0; */
  padding: 5px 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  color: ${({ theme }) => theme.color.text02};
  border: 1px solid ${({ theme }) => theme.color.text02};
  background-color: ${({ theme }) => theme.color.text01};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  text-transform: none;
  border-radius: 6px;
  animation: ${outOfWormholeAnimation} 900ms linear 1200ms both;
`;

type Props = {
  points: number;
};

export function Points({ points }: Props): JSX.Element | null {
  if (!points) return null;

  return <Container>{points}</Container>;
}
