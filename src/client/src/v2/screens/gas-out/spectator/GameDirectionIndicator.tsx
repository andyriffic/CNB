import React from 'react';
import styled, { css } from 'styled-components';
import { GasGame, GasGameDirection } from '../../../providers/GasProvider';
import arrowImage from './arrow-left-1.gif';

const Arrow = styled.img<{ direction: GasGameDirection }>`
  width: 70px;
  transition: transform 300ms ease-in-out;
  ${({ direction }) =>
    css`
      transform: rotate(${direction === 'right' ? '180' : '0'}deg);
    `}
`;

type Props = {
  game: GasGame;
};

export function GameDirectionIndicator({ game }: Props): JSX.Element {
  return <Arrow src={arrowImage} alt="" direction={game.direction} />;
}
