import React from 'react';
import styled from 'styled-components';
import { GasGame } from '../../../providers/GasProvider';

const Container = styled.div<{ size: number }>`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 3px solid brown;
  border-radius: 50%;
  background-color: burlywood;
  width: ${({ size }) => size * 10 + 50}px;
  height: ${({ size }) => size * 10 + 50}px;
`;

const PressesRemaining = styled.div`
  font-size: 1rem;
  color: blanchedalmond;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

type Props = {
  game: GasGame;
};

export function GasCloud({ game }: Props): JSX.Element {
  return (
    <Container size={game.gasCloud.pressed}>
      {
        <PressesRemaining>
          {game.currentPlayer.pressesRemaining}
        </PressesRemaining>
      }
    </Container>
  );
}
