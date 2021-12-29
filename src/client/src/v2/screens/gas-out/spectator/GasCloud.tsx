import React from 'react';
import styled from 'styled-components';
import { GasGame } from '../../../providers/GasProvider';

const Container = styled.div<{ size: number; exploded: boolean }>`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 3px solid brown;
  border-radius: 50%;
  background-color: ${({ exploded }) => (exploded ? 'red' : 'steelblue')};
  width: ${({ size }) => size * 10 + 50}px;
  height: ${({ size }) => size * 10 + 50}px;
  transition: all 180ms ease-in;
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
  return (
    <Container size={game.gasCloud.pressed} exploded={game.gasCloud.exploded}>
      {
        <PressesRemaining size={game.gasCloud.pressed}>
          {game.gasCloud.exploded && 'BOOM!'}
          {!game.gasCloud.exploded &&
            game.currentPlayer.pressesRemaining > 0 &&
            game.currentPlayer.pressesRemaining}
        </PressesRemaining>
      }
    </Container>
  );
}
