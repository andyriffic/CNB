/* @flow */
import React from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import DebugOutput from '../../DebugOutput';
import SelectMove from './components/select-move';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const View = ( { playerKey }: Props ) => {
  const playerState = usePlayerState(playerKey);

  useGetGameState();

  return (
    <React.Fragment>
      <h2>{ playerKey }</h2>
      <SelectMove/>
      <DebugOutput data={ playerState } />
    </React.Fragment>
  )
}

export default View;
