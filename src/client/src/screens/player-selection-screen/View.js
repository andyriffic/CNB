/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, {useContext} from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import DebugOutput from '../../DebugOutput';
import SelectMove from './components/select-move';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const View = ( { playerKey }: Props ) => {
  const playerState = usePlayerState(playerKey);
  const serverMessages = useContext(ServerMessagesContext);

  useGetGameState();

  const onSelection = (move) => {
    serverMessages.makeMove(playerState.slot, move);
  }

  if (!playerState) return null;

  return (    
    <React.Fragment>
      <h2>{ playerState.player.name }</h2>
      <SelectMove onSelection={ onSelection } />
      <DebugOutput data={ playerState } />
    </React.Fragment>
  )
}

export default View;
