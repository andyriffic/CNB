import React from 'react';
import styled from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';
import { SOCKETS_ENDPOINT } from '../../../../environment';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20%;

  &:last-child {
    margin-right: 0;
  }
`;

const MoveContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoveImage = styled.img`
  height: 15vmin;
`;

const MoveName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.4rem;
  text-align: center;
  font-size: 0.7rem;
`;

const WinsByText = styled.p`
  margin: 0;
  padding: 0 20px;
  font-size: 0.7rem;
`;

type MoveInfoProps = {
  moves: [ThemedMove, ThemedMove, ThemedMove];
};

export const MoveInfo = ({ moves }: MoveInfoProps) => {
  return (
    <Container className="margins-off">
      <MoveContainer>
        <MoveImage src={`${SOCKETS_ENDPOINT}${moves[0].imageUrl}`} />
        <MoveName>{moves[0].name.english}</MoveName>
      </MoveContainer>
      <WinsByText>{moves[0].winsBy.english}</WinsByText>
      <MoveContainer>
        <MoveImage src={`${SOCKETS_ENDPOINT}${moves[1].imageUrl}`} />
        <MoveName>{moves[1].name.english}</MoveName>
      </MoveContainer>
      <WinsByText>{moves[1].winsBy.english}</WinsByText>
      <MoveContainer>
        <MoveImage src={`${SOCKETS_ENDPOINT}${moves[2].imageUrl}`} />
        <MoveName>{moves[2].name.english}</MoveName>
      </MoveContainer>
      <WinsByText>{moves[2].winsBy.english}</WinsByText>
      <MoveContainer>
        <MoveImage src={`${SOCKETS_ENDPOINT}${moves[0].imageUrl}`} />
        <MoveName>{moves[0].name.english}</MoveName>
      </MoveContainer>
    </Container>
  );
};
