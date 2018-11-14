/* @flow */
import React from 'react';
import PlayerStatus from './player-status';

type Props = {
  player1: Object,
  player2: Object,
}

const View = ( {player1, player2 }: Props ) => {
  return (
    <React.Fragment>
      <h2>Waiting</h2>
      <PlayerStatus { ...player1 } />
      <div>seperator</div>
      <PlayerStatus { ...player2 } />
    </React.Fragment>
  );
}

export default View;
