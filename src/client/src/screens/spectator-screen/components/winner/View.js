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

const extremeFadeAndScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(.5, .5);
    }
    60% {
        opacity: 1;
        transform: scale(1.3, 1.3);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const WinnerHeading = styled.h2`
  opacity: 0;
  animation: ${extremeFadeAndScale} 1s linear 4s 1 forwards;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenteredText = styled.span`
  align-self: center;
`;

const WinnerAnimated = styled(CenteredText)`
  opacity: 0;
  animation: ${fadeAndScale} 1s linear 1s 1 forwards;
`;

const BeatsAnimated = styled(CenteredText)`
  font-size: 3vmin;
  opacity: 0;
  animation: ${fadeAndScale} 1s linear 1.2s 1 forwards;
`;

const LoserAnimated = styled(CenteredText)`
  opacity: 0;
  animation: ${fadeAndScale} 1s linear 1.4s 1 forwards;
`;


const View = ( { player1, player2, result }: Props ) => {
  const winner = (result.winner === 'player1') ? player1 : player2;
  const loser = (winner === player1) ? player2 : player1;

  return (
    <WinnerView>
      <ResultContainer>
        <WinnerAnimated>{winner.move}</WinnerAnimated>
        <BeatsAnimated>beats</BeatsAnimated>
        <LoserAnimated>{loser.move}</LoserAnimated>
      </ResultContainer>
      <WinnerHeading>{winner.name} wins!</WinnerHeading>
    </WinnerView>
  );
}

export default View;
