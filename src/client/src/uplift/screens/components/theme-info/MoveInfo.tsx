import React from 'react';
import styled from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';
import { SOCKETS_ENDPOINT } from '../../../../environment';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const MoveImage = styled.img`
  width: 8vmin;
  height: 8vmin;
`;

type MoveInfoProps = {
  moves: [ThemedMove, ThemedMove, ThemedMove];
};

export const MoveInfo = ({ moves }: MoveInfoProps) => {
  return (
    <Container className="margins-off">
      <MoveImage src={`${SOCKETS_ENDPOINT}${moves[0].imageUrl}`} />
      {moves[0].winsBy.english}
      <MoveImage src={`${SOCKETS_ENDPOINT}${moves[1].imageUrl}`} />
      {moves[1].winsBy.english}
      <MoveImage src={`${SOCKETS_ENDPOINT}${moves[2].imageUrl}`} />
      {moves[2].winsBy.english}
      <MoveImage src={`${SOCKETS_ENDPOINT}${moves[0].imageUrl}`} />
    </Container>
  );
};
