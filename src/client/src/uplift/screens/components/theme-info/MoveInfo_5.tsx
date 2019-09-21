import React from 'react';
import styled from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';
import { SOCKETS_ENDPOINT } from '../../../../environment';

const Container = styled.div`
  display: flex;
  align-items: center;
  overflow-y: scroll;
  overflow-x: visible;
`;

const BracketContainer = styled.div`
  display: flex;
  box-shadow: 0 0 10px #ccc;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;

const MoveContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoveImage = styled.img`
  width: 8vmin;
  height: 8vmin;
`;

const MoveName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.4rem;
  text-align: center;
`;

const WinsByText = styled.p`
  margin: 0;
  padding: 0 5px;
  font-size: 0.6rem;
`;

type MoveInfoProps = {
  moves: { [key: string]: ThemedMove };
};

export const MoveInfo = ({ moves }: MoveInfoProps) => {
  return (
    <Container className="margins-off">
      <BracketContainer className="margins-off">
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.A.imageUrl}`} />
          <MoveName>{moves.A.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>{moves.A.winsBy.english}</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.B.imageUrl}`} />
          <MoveName>{moves.B.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>+</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.D.imageUrl}`} />
          <MoveName>{moves.D.name.english}</MoveName>
        </MoveContainer>
      </BracketContainer>

      <BracketContainer className="margins-off">
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.B.imageUrl}`} />
          <MoveName>{moves.B.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>{moves.B.winsBy.english}</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.C.imageUrl}`} />
          <MoveName>{moves.C.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>+</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.E.imageUrl}`} />
          <MoveName>{moves.E.name.english}</MoveName>
        </MoveContainer>
      </BracketContainer>

      <BracketContainer className="margins-off">
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.C.imageUrl}`} />
          <MoveName>{moves.C.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>{moves.C.winsBy.english}</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.A.imageUrl}`} />
          <MoveName>{moves.A.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>+</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.D.imageUrl}`} />
          <MoveName>{moves.D.name.english}</MoveName>
        </MoveContainer>
      </BracketContainer>

      <BracketContainer className="margins-off">
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.D.imageUrl}`} />
          <MoveName>{moves.D.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>{moves.D.winsBy.english}</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.B.imageUrl}`} />
          <MoveName>{moves.B.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>+</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.E.imageUrl}`} />
          <MoveName>{moves.E.name.english}</MoveName>
        </MoveContainer>
      </BracketContainer>

      <BracketContainer className="margins-off">
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.E.imageUrl}`} />
          <MoveName>{moves.E.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>{moves.E.winsBy.english}</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.A.imageUrl}`} />
          <MoveName>{moves.A.name.english}</MoveName>
        </MoveContainer>
        <WinsByText>+</WinsByText>
        <MoveContainer>
          <MoveImage src={`${SOCKETS_ENDPOINT}${moves.C.imageUrl}`} />
          <MoveName>{moves.C.name.english}</MoveName>
        </MoveContainer>
      </BracketContainer>
    </Container>
  );
};
