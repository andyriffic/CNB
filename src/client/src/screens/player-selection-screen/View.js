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
import { FullViewPort, MobilePageHeader, CenteredContentContainer } from './styled';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const hasGameResult = (gameState) => !!(gameState && gameState.result);
const gameIsDraw = (gameState) => hasGameResult(gameState) && gameState.result.draw;
const playerHasMoved = (gameState, playerState) => playerState && playerState.player && playerState.player.moved;
const playerWins = (gameState, player) => !gameIsDraw(gameState) && hasGameResult(gameState) && gameState.result.winner === player;
const playerLoses = (gameState, player) => !gameIsDraw(gameState) && hasGameResult(gameState) && gameState.result.winner !== player;

const View = ( { playerKey }: Props ) => {
  const playerState = usePlayerState(playerKey);
  const serverMessages = useContext(ServerMessagesContext);
  const gameState = useContext(GameStateContext);

  useGetGameState();

  const onSelection = (move) => {
    serverMessages.makeMove(playerState.slot, move);
  }

  if (!playerState) return null;

  console.log('hasGameResult', hasGameResult(gameState));
  console.log('gameIsDraw', gameIsDraw(gameState));
  console.log('playerHasMoved', playerHasMoved(gameState, playerState));
  console.log('playerWins', playerWins(gameState, playerState.slot));
  console.log('playerLoses', playerLoses(gameState, playerState.slot));

  return (    
    <FullViewPort>
      <MobilePageHeader>{ playerState.player.name }</MobilePageHeader>
      <CenteredContentContainer>
        <Switch>
          <SelectMove showIf={ !hasGameResult(gameState) && !playerHasMoved(gameState, playerState) } onSelection={ onSelection }/>
          <SelectedMove showIf={ !hasGameResult(gameState) && playerHasMoved(gameState, playerState) } selectedMove={ playerState.player.move }/>
          <Draw showIf={ gameIsDraw(gameState) }/>
          <Loser showIf={ playerWins(gameState, playerState.slot) }/>
          <Winner showIf={ playerLoses(gameState, playerState.slot) }/>
        </Switch>
      </CenteredContentContainer>
      <DebugOutput data={ playerState } />
      <DebugOutput data={ gameState } />
    </FullViewPort>
  )
}

export default View;
