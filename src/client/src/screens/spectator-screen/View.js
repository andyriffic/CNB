/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';

const View = () => {
  const gameState = useContext(GameStateContext);

  useGetGameState();

  return (
    <React.Fragment>
      <DebugOutput data={ gameState } />
    </React.Fragment>
  )
}

export default View;
