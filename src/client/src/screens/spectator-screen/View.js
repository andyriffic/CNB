/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';

import Waiting from './components/waiting';

const View = () => {
  const gameState = useContext(GameStateContext);

  useGetGameState();

  return (
    <React.Fragment>
      {
        gameState && (
          <Waiting player1={gameState.player1} player2={gameState.player2} />
        )
      }
      <DebugOutput data={ gameState } />
    </React.Fragment>
  )
}

export default View;
