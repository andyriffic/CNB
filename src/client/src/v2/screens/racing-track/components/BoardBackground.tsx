import React from 'react';
import styled from 'styled-components';
import { GameBoard } from '../types';

const Container = styled.div<{ img: any }>`
  position: relative;
  border: 1px solid black;
  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: contain;
`;

type Props = {
  board: GameBoard;
  children: React.ReactNodeArray | React.ReactNode;
};

export const BoardBackground = ({ board, children }: Props): JSX.Element => {
  return (
    <Container
      img={board.boardBackgroundImage}
      style={{ width: `${board.widthPx}px`, height: `${board.heightPx}px` }}
    >
      {children}
    </Container>
  );
};
