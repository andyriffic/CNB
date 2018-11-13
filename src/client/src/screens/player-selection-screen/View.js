/* @flow */
import React from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const View = ( { playerKey }: Props ) => {
  const playerState = usePlayerState(playerKey);

  useGetGameState();

  return (
    <React.Fragment>
      <h2>Player selection screen for { playerKey }</h2>
      <h3>Player state</h3>
      <pre>
        { JSON.stringify(playerState) }
      </pre>
    </React.Fragment>
  )
}

export default View;
