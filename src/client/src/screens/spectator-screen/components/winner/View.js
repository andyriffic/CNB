/* @flow */
import React from 'react';
import styled from 'styled-components';

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

const View = ( { player1, player2, result }: Props ) => {
  const winner = (result.winner === 'player1') ? player1 : player2;
  const loser = (winner === 'player1') ? player2 : player1;

  return (
    <WinnerView>
      <h2>{winner.name} wins!</h2>
      <CenteredText>{winner.move}</CenteredText>
      <CenteredText>beats</CenteredText>
      <CenteredText>{loser.move}</CenteredText>
    </WinnerView>
  );
}

export default View;
