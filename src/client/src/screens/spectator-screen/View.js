/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';
import Switch from '../../components/switch'

import Waiting from './components/waiting';
import Loading from './components/loading';
import Ready from './components/ready';
import Result from './components/result';

const waitingStatuses = [ 'EMPTY', 'WAITING_FOR_PLAYER_1', 'WAITING_FOR_PLAYER_2' ]

const View = () => {
  const gameState = useContext(GameStateContext);

  useGetGameState();

  return (
    <React.Fragment>

      {
        gameState ? (
          <Switch>
            <Waiting
              showIf={waitingStatuses.includes(gameState.status)}
              player1={gameState.player1}
              player2={gameState.player2} />
            <Ready showIf={gameState.status==='READY'}/>
          </Switch>
        ) : (
          <Loading />
        )
      }

      <DebugOutput data={ gameState } />
    </React.Fragment>
  )
}

export default View;
