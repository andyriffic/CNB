/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, {useContext} from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import DebugOutput from '../../DebugOutput';
import SelectMove from './components/select-move';
import SelectedMove from './components/selected-move';
import Winner from './components/outcome-winner';
import Loser from './components/outcome-loser';
import Draw from './components/outcome-draw';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import GameStateContext from '../../contexts/GameStateContext';
import Switch from '../../components/switch';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const View = ( { playerKey }: Props ) => {
  const playerState = usePlayerState(playerKey);
  const serverMessages = useContext(ServerMessagesContext);
  const gameState = useContext(GameStateContext);

  useGetGameState();

  const onSelection = (move) => {
    serverMessages.makeMove(playerState.slot, move);
  }

  if (!playerState) return null;

  return (    
    <React.Fragment>
      <h2>{ playerState.player.name }</h2>
      <Switch>
        <SelectedMove showIf={ playerState.player.moved } selectedMove={ playerState.player.move }/>
        <SelectMove showIf={ !playerState.player.moved } onSelection={ onSelection }/>
        <Draw showIf={ gameState && gameState.result && gameState.result.draw }/>
        <Loser showIf={ gameState && gameState.result && !gameState.result.draw && gameState.result.winner !== playerState.slot }/>
        <Winner showIf={ gameState && gameState.result && !gameState.result.draw && gameState.result.winner === playerState.slot }/>
      </Switch>

      <DebugOutput data={ playerState } />
      <DebugOutput data={ gameState } />
    </React.Fragment>
  )
}

export default View;
