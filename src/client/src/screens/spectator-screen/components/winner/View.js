/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  result: Object,
  player1: Object,
  player2: Object,
}

const WinnerView = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
`;

const CenteredText = styled.span`
  align-self: center;
`;

const fadeAndScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(.5, .5);
    }
    75% {
        opacity: 1;
        transform: scale(1.1, 1.1);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const displayAfter = keyframes`
    0% {
        visibility: hidden;
    }
    100% {
        visibility: visible;
    }
`;

const WinnerHeading = styled.h2`
  opacity: 0;
  animation: ${fadeAndScale} 1s linear 6s 1 forwards;
`;

const ResultContainer = styled.div`
  visibility: hidden;
  display: flex;
  flex-direction: column;
  animation: ${displayAfter} 0s linear 8s 1 forwards;
`

const View = ( { player1, player2, result }: Props ) => {
  const winner = (result.winner === 'player1') ? player1 : player2;
  const loser = (winner === 'player1') ? player2 : player1;

  return (
    <WinnerView>
      <WinnerHeading>{winner.name} wins!</WinnerHeading>
      <ResultContainer>
        <CenteredText>{winner.move}</CenteredText>
        <CenteredText>beats</CenteredText>
        <CenteredText>{loser.move}</CenteredText>
      </ResultContainer>
    </WinnerView>
  );
}

export default View;
