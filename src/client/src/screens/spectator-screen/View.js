/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import useGetGameState from '../hooks/useGetGameState';

const View = () => {
  const gameState = useContext(GameStateContext);

  useGetGameState();

  return (
    <React.Fragment>
      <h2>Spectator screen</h2>
      <h3>Game state</h3>
      <pre>
        { JSON.stringify(gameState) }
      </pre>
    </React.Fragment>
  )
}

export default View;
