/* @flow */
import React from 'react';
import styled from 'styled-components';

import PlayerStatus from './player-status';

type Props = {
  player1: Object,
  player2: Object,
}

const WaitingView = styled.div`
  display: flex;
`

const Seperator = styled.div`
  border: 2px dashed black;
  margin-left: 10px;
  margin-right: 10px;
`;

const View = ( {player1, player2 }: Props ) => {
  return (
    <React.Fragment>
      <h2>Waiting</h2>
      <WaitingView>
        <PlayerStatus { ...player1 } />
        <Seperator />
        <PlayerStatus { ...player2 } />
      </WaitingView>
    </React.Fragment>
  );
}

export default View;
