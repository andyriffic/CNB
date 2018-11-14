/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
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
  const serverMessages = useContext(ServerMessagesContext);

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
            <Ready
              showIf={gameState.status==='READY'}
              player1={gameState.player1}
              player2={gameState.player2}
              playGame={serverMessages.playGame}
            />
            <Result
              showIf={gameState.status==='FINISHED'}
              result={gameState.result}
              player1={gameState.player1}
              player2={gameState.player2}
              resetGame={serverMessages.resetGame}
            />
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
