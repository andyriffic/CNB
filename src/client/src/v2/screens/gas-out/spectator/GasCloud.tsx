import React from 'react';
import styled, { css } from 'styled-components';
import tinycolor from 'tinycolor2';
import { shakeAnimationLeft } from '../../../../uplift/components/animations';
import { SplashText } from '../../../components/SplashText';
import { GasGame } from '../../../providers/GasProvider';

function getCloudAnimationSpeedMilliSeconds(intensity: number): number {
  return Math.max(10000 - intensity * 500, 500);
}

const Container = styled.div<{ size: number; exploded: boolean }>`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  ${({ size, exploded }) =>
    !exploded
      ? css`
          animation: ${shakeAnimationLeft}
            ${getCloudAnimationSpeedMilliSeconds(size)}ms ease-in-out 0s
            infinite;
        `
      : ''};
`;

const Ballon = styled.div<{ size: number }>`
  display: inline-block;
  width: ${({ size }) => size * 10 + 50}px;
  height: ${({ size }) => size * 10 + 50}px;
  background: ${({ size }) =>
    tinycolor('hsl(23, 55%, 57%)')
      .saturate(size * 10)
      .toString()};
  border-radius: 80%;
  position: relative;
  transition: all 180ms ease-in;
  box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.07);
  margin: 20px 30px;

  &::before {
    content: '▲';
    font-size: 20px;
    color: ${({ size }) =>
      tinycolor('hsl(23, 44%, 46%)')
        .saturate(size * 10)
        .toString()};
    display: block;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: -12px;
    z-index: -100;
  }
`;

const PressesRemaining = styled.div<{ size: number }>`
  font-size: ${({ size }) => size * 0.1 + 1}rem;
  color: blanchedalmond;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

type Props = {
  game: GasGame;
};

export function GasCloud({ game }: Props): JSX.Element {
  const visibleSize = game.gasCloud.exploded ? 0 : game.gasCloud.pressed;
  return (
    <Container size={visibleSize} exploded={game.gasCloud.exploded}>
      <Ballon size={visibleSize} />
      {game.gasCloud.exploded && (
        <SplashText durationMilliseconds={300}>💥</SplashText>
      )}
    </Container>
  );
}
