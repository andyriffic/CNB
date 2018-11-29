/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useState, useEffect } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';
import Switch from '../../components/switch'

import Waiting from './components/waiting';
import Loading from './components/loading';
import Ready from './components/ready';
import Result from './components/result';
import Countdown from './components/countdown';
import {SOUND_KEYS} from '../../sounds/soundService';
import GameSoundContext from '../../contexts/GameSoundContext';
import { GameSettingsDrawer } from '../../game-settings';

const waitingStatuses = [ 'EMPTY', 'WAITING_FOR_PLAYER_1', 'WAITING_FOR_PLAYER_2' ];

const View = () => {
  const [showCountdown, setShowCountdown] = useState(null);
  const gameState = useContext(GameStateContext);
  const serverMessages = useContext(ServerMessagesContext);
  const soundService = useContext(GameSoundContext);

  useEffect(() => {
    if(gameState && gameState.status === 'FINISHED' ) {
      setShowCountdown(true);
      setTimeout(()=> {
        setShowCountdown(false);
      }, 3500);
    }
  }, [gameState]);

  useEffect(() => {
    if(gameState && gameState.status === 'FINISHED' ) {
      soundService.stop(SOUND_KEYS.WAITING_MUSIC);
    }

    if(gameState && gameState.status !== 'FINISHED' ) {
      soundService.play(SOUND_KEYS.WAITING_MUSIC);
    }
  }, [gameState]);

  useGetGameState();

  return (
    <React.Fragment>
      <GameSettingsDrawer/>
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
            <Countdown
              showIf={gameState.status==='FINISHED' && (showCountdown !== null && showCountdown === true)}
            />
            <Result
              showIf={gameState.status==='FINISHED' && (showCountdown !== null && showCountdown === false)}
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
